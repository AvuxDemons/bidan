"use server"

import admin from "firebase-admin"
import { firestore } from "@/lib/firebase/server"
import { Bunda } from "@/types/bunda"

export async function getBunda(keluargaId: string) {
    const bundaRef = firestore.collection('bunda')
    const q = bundaRef.where('keluargaId', '==', keluargaId).limit(1)

    const snapshot = await q.get()
    if (snapshot.empty) return null

    const data = snapshot.docs[0].data()
    return {
        id: snapshot.docs[0].id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
    } as Bunda
}

export async function createBunda(data: Partial<Bunda>) {
    const newDocRef = firestore.collection('bunda').doc()
    await newDocRef.set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    return newDocRef.id
}

export async function updateBunda(id: string, data: Partial<Bunda>) {
    await firestore.collection('bunda').doc(id).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
}

export async function deleteBunda(id: string) {
    await firestore.collection('bunda').doc(id).delete()
}
