import { useState, useEffect } from 'react'
import { db, collection, query, onSnapshot } from "@/lib/firebase/client"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useLayanan() {
    const [layananList, setLayananList] = useState<Layanan[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const layananRef = collection(db, 'layanan')
        const q = query(layananRef)

        const unsubscribe = onSnapshot(
            q,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const layananList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                } as Layanan))
                setLayananList(layananList)
            },
            (err) => setError(err)
        )
        return () => unsubscribe()
    }, [])

    return { layananList, error }
}
