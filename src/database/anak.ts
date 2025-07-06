"use server"

import admin from "firebase-admin"
import { firestore } from "@/lib/firebase/server"
import { Anak } from "@/types/anak"

export async function getAnakList(keluargaId: string) {
    const anakRef = firestore.collection('anak')
    const q = anakRef.where('keluargaId', '==', keluargaId)

    const snapshot = await q.get()
    return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate()
        } as Anak
    })
}

export async function createAnak(data: Partial<Anak>) {
    const newDocRef = firestore.collection('anak').doc()
    await newDocRef.set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    return newDocRef.id
}

export async function updateAnak(id: string, data: Partial<Anak>) {
    await firestore.collection('anak').doc(id).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
}

export async function deleteAnak(id: string) {
    await firestore.collection('anak').doc(id).delete()
}
