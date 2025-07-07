import { useState, useEffect } from 'react'
import { db, collection, onSnapshot } from "@/lib/firebase/client"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useAyahAdmin() {
    const [ayahList, setAyahList] = useState<Ayah[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const ayahRef = collection(db, 'ayah')
        const unsubscribe = onSnapshot(
            ayahRef,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                } as Ayah))
                setAyahList(list)
            },
            (err) => setError(err)
        )

        return () => unsubscribe()
    }, [])

    return { ayahList, error }
}
