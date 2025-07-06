import { firestore } from "@/lib/firestore"
import { Ayah } from "@/types/keluarga"

export async function createAyah(data: Omit<Ayah, "id">) {
    const docRef = await firestore.collection("ayah").add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return { id: docRef.id, ...data }
}

export async function getAyah(id: string) {
    const doc = await firestore.collection("ayah").doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } as Ayah : null
}

export async function updateAyah(id: string, data: Partial<Ayah>) {
    await firestore.collection("ayah").doc(id).update({
        ...data,
        updatedAt: new Date()
    })
}

export async function deleteAyah(id: string) {
    await firestore.collection("ayah").doc(id).delete()
}

export async function getAyahByKeluargaId(keluargaId: string) {
    const snapshot = await firestore.collection("ayah")
        .where("keluargaId", "==", keluargaId)
        .limit(1)
        .get()

    return snapshot.empty ? null : {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
    } as Ayah
}
