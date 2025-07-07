"use server"

import admin from "firebase-admin"
import { firestore } from "@/lib/firebase/server"

export async function getAyah(keluargaId: string) {
    const ayahRef = firestore.collection('ayah')
    const q = ayahRef.where('keluargaId', '==', keluargaId).limit(1)

    const snapshot = await q.get()
    if (snapshot.empty) return null

    const data = snapshot.docs[0].data()
    return {
        id: snapshot.docs[0].id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
    } as Ayah
}

export async function createAyah(data: Partial<Ayah>) {
    const newDocRef = firestore.collection('ayah').doc()
    await newDocRef.set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    return newDocRef.id
}

export async function updateAyah(id: string, data: Partial<Ayah>) {
    await firestore.collection('ayah').doc(id).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
}

export async function deleteAyah(id: string) {
    await firestore.collection('ayah').doc(id).delete()
}
