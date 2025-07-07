import { useState, useEffect } from 'react'
import { db, collection, onSnapshot } from "@/lib/firebase/client"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useBundaAdmin() {
    const [bundaList, setBundaList] = useState<Bunda[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const bundaRef = collection(db, 'bunda')
        const unsubscribe = onSnapshot(
            bundaRef,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                } as Bunda))
                setBundaList(list)
            },
            (err) => setError(err)
        )

        return () => unsubscribe()
    }, [])

    return { bundaList, error }
}
