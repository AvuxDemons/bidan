import { firestore } from "@/lib/firestore"
import { Keluarga } from "@/types/keluarga"

export async function createKeluarga(data: Omit<Keluarga, "id">) {
    const docRef = await firestore.collection("keluarga").add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return { id: docRef.id, ...data }
}

export async function getKeluarga(id: string) {
    const doc = await firestore.collection("keluarga").doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } as Keluarga : null
}

export async function updateKeluarga(id: string, data: Partial<Keluarga>) {
    await firestore.collection("keluarga").doc(id).update({
        ...data,
        updatedAt: new Date()
    })
}

export async function deleteKeluarga(id: string) {
    await firestore.collection("keluarga").doc(id).delete()
}

export async function getKeluargaByUserId(userId: string) {
    const snapshot = await firestore.collection("keluarga")
        .where("userId", "==", userId)
        .limit(1)
        .get()

    return snapshot.empty ? null : {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
    } as Keluarga
}
