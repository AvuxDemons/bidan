import { useState, useEffect } from 'react'
import { db, collection, query, onSnapshot } from "@/lib/firebase/client"
import { Keluarga } from "@/types/keluarga"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useKeluarga() {
    const [keluargaList, setKeluargaList] = useState<Keluarga[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const keluargaRef = collection(db, 'keluarga')
        const q = query(keluargaRef)

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const keluargaList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                } as Keluarga))
                setKeluargaList(keluargaList)
            },
            (err) => setError(err)
        )
        return () => unsubscribe()
    }, [])

    return { keluargaList, error }
}
