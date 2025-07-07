import { useState, useEffect } from 'react'
import { db, collection, onSnapshot } from "@/lib/firebase/client"
import { QuerySnapshot, DocumentData } from "firebase/firestore"

export function useAnakAdmin() {
    const [anakList, setAnakList] = useState<Anak[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const anakRef = collection(db, 'anak')
        const unsubscribe = onSnapshot(
            anakRef,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                } as Anak))
                setAnakList(list)
            },
            (err) => setError(err)
        )

        return () => unsubscribe()
    }, [])

    return { anakList, error }
}
