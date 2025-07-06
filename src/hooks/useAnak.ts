import { useState, useEffect } from 'react'
import { db, collection, query, where, onSnapshot } from "@/lib/firebase/client"
import { Anak } from "@/types/anak"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useAnak(keluargaId?: string) {
    const [anakList, setAnakList] = useState<Anak[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!keluargaId) return

        const anakRef = collection(db, 'anak')
        const q = query(anakRef, where('keluargaId', '==', keluargaId))

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const anakList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                }) as Anak)
                setAnakList(anakList)
            },
            (err) => setError(err)
        )

        return () => unsubscribe()
    }, [keluargaId])

    return { anakList, error }
}
