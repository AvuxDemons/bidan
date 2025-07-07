"use server"

import admin from "firebase-admin"
import { firestore } from "@/lib/firebase/server"

export async function getKeluargaList(userId?: string) {
    const keluargaRef = firestore.collection('keluarga')
    const query = userId
        ? keluargaRef.where('userId', '==', userId)
        : keluargaRef

    const snapshot = await query.get()
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate()
        } as Keluarga;
    })
}

export async function createKeluarga(data: Partial<Keluarga>) {
    const newDocRef = firestore.collection('keluarga').doc()
    await newDocRef.set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    return newDocRef.id
}

export async function updateKeluarga(id: string, data: Partial<Keluarga>) {
    await firestore.collection('keluarga').doc(id).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
}

export async function deleteKeluarga(id: string) {
    await firestore.collection('keluarga').doc(id).delete()
}
