import { useState, useEffect } from 'react'
import { db, collection, query, where, limit, onSnapshot } from "@/lib/firebase/client"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useAyah(keluargaId?: string) {
    const [ayah, setAyah] = useState<Ayah | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!keluargaId) return

        const ayahRef = collection(db, 'ayah')
        const q = query(ayahRef, where('keluargaId', '==', keluargaId), limit(1))

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const ayahData = snapshot.empty ? null : {
                    id: snapshot.docs[0].id,
                    ...snapshot.docs[0].data(),
                    createdAt: snapshot.docs[0].data().createdAt?.toDate(),
                    updatedAt: snapshot.docs[0].data().updatedAt?.toDate()
                } as Ayah
                setAyah(ayahData)
            },
            (err) => setError(err)
        )

        return () => unsubscribe()
    }, [keluargaId])

    return { ayah, error }
}
