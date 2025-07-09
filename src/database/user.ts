"use server"

import admin from "firebase-admin"
import { firestore } from "@/lib/firebase/server"

export async function updateUser(userId: string, data: Partial<User>) {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const userRef = firestore.collection('users').doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
        await userRef.update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } else {
        await userRef.set({
            ...data,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }
}

export async function getUser(userId: string) {
    const doc = await firestore.collection('users').doc(userId).get()
    if (!doc.exists) return null

    const data = doc.data()
    return {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt?.toDate(),
        updatedAt: data?.updatedAt?.toDate()
    } as User
}
