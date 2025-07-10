"use server"

import admin from "firebase-admin"
import { firestore } from "@/lib/firebase/server"

export async function getLayananList() {
    const snapshot = await firestore.collection('layanan').get()
    return snapshot.docs.map(doc => {
        const data = doc.data()
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate()
        } as Layanan
    })
}

export async function createLayanan(data: Partial<Layanan>) {
    const newDocRef = firestore.collection('layanan').doc()
    await newDocRef.set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    return newDocRef.id
}

export async function updateLayanan(id: string, data: Partial<Layanan>) {
    await firestore.collection('layanan').doc(id).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
}

export async function deleteLayanan(id: string) {
    await firestore.collection('layanan').doc(id).delete()
}
