import { useState, useEffect } from 'react'
import { db, collection, query, where, limit, onSnapshot } from "@/lib/firebase/client"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useBunda(keluargaId?: string) {
    const [bunda, setBunda] = useState<Bunda | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!keluargaId) return

        const bundaRef = collection(db, 'bunda')
        const q = query(bundaRef, where('keluargaId', '==', keluargaId), limit(1))

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const bundaData = snapshot.empty ? null : {
                    id: snapshot.docs[0].id,
                    ...snapshot.docs[0].data(),
                    createdAt: snapshot.docs[0].data().createdAt?.toDate(),
                    updatedAt: snapshot.docs[0].data().updatedAt?.toDate()
                } as Bunda
                setBunda(bundaData)
            },
            (err) => setError(err)
        )

        return () => unsubscribe()
    }, [keluargaId])

    return { bunda, error }
}
