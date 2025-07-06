import { firestore } from "@/lib/firestore"
import { Ibu } from "@/types/keluarga"

export async function createIbu(data: Omit<Ibu, "id">) {
    const docRef = await firestore.collection("ibu").add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return { id: docRef.id, ...data }
}

export async function getIbu(id: string) {
    const doc = await firestore.collection("ibu").doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } as Ibu : null
}

export async function updateIbu(id: string, data: Partial<Ibu>) {
    await firestore.collection("ibu").doc(id).update({
        ...data,
        updatedAt: new Date()
    })
}

export async function deleteIbu(id: string) {
    await firestore.collection("ibu").doc(id).delete()
}

export async function getIbuByKeluargaId(keluargaId: string) {
    const snapshot = await firestore.collection("ibu")
        .where("keluargaId", "==", keluargaId)
        .limit(1)
        .get()

    return snapshot.empty ? null : {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
    } as Ibu
}
