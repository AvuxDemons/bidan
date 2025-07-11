import { useEffect, useMemo, useState } from 'react';
import {
    collection,
    query,
    onSnapshot,
    DocumentData,
    QuerySnapshot,
    Query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export type SortDirection = 'asc' | 'desc';

interface PaginationConfig<T> {
    collectionPath: string;
    initialPageSize?: number;
    initialPage?: number;
    mapDoc?: (doc: DocumentData, id: string) => T;
}

export function usePaginatedCollection<T extends Record<string, any>>({
    collectionPath,
    initialPageSize = 10,
    initialPage = 1,
    mapDoc,
}: PaginationConfig<T>) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<T[]>([]);
    const [filtered, setFiltered] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<string | undefined>(undefined);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const ref = collection(db, collectionPath);
        const q = query(ref);

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const docs = snapshot.docs.map((doc) => {
                    const raw = doc.data();
                    return mapDoc
                        ? mapDoc(raw, doc.id)
                        : ({
                            id: doc.id,
                            ...raw,
                            createdAt: raw.createdAt?.toDate?.(),
                            updatedAt: raw.updatedAt?.toDate?.(),
                        } as unknown as T);
                });
                setData(docs);
                setFiltered(docs);
            },
            (err) => setError(err)
        );

        setLoading(false);

        return () => unsubscribe();
    }, [collectionPath]);

    // Pagination logic
    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page, pageSize]);

    // Sorting
    const sort = (key: string) => {
        const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
        const sorted = [...filtered].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFiltered(sorted);
        setSortKey(key);
        setSortDirection(direction);
    };

    // Filter / Search (user-defined)
    const filter = (predicate: (item: T) => boolean) => {
        const filtered = data.filter(predicate);
        setFiltered(filtered);
        setPage(1);
    };

    const reset = () => {
        setFiltered(data);
        setSearch('');
        setSortKey(undefined);
        setSortDirection('asc');
        setPage(1);
    };

    return {
        loading,
        data,
        filtered,
        paginated,
        page,
        pageSize,
        totalData: filtered.length,
        search,
        sortKey,
        sortDirection,
        error,
        setLoading,
        setSearch,
        setPage,
        setPageSize,
        sort,
        filter,
        reset,
    };
}
