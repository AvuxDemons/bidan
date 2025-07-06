import { firestore } from "@/lib/firestore"
import { Anak } from "@/types/keluarga"
import { getKeluarga, updateKeluarga } from "./keluarga"

export async function createAnak(data: Omit<Anak, "id">) {
    const docRef = await firestore.collection("anak").add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return { id: docRef.id, ...data }
}

export async function getAnak(id: string) {
    const doc = await firestore.collection("anak").doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } as Anak : null
}

export async function updateAnak(id: string, data: Partial<Anak>) {
    await firestore.collection("anak").doc(id).update({
        ...data,
        updatedAt: new Date()
    })
}

export async function deleteAnak(id: string) {
    await firestore.collection("anak").doc(id).delete()
}

export async function getAnakByKeluargaId(keluargaId: string) {
    const snapshot = await firestore.collection("anak")
        .where("keluargaId", "==", keluargaId)
        .get()

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Anak[]
}

export async function addAnakToKeluarga(keluargaId: string, anakData: Omit<Anak, "id" | "keluargaId">) {
    const anak = await createAnak({
        ...anakData,
        keluargaId
    })

    // Update keluarga's anakIds array
    const keluarga = await getKeluarga(keluargaId)
    if (keluarga) {
        await updateKeluarga(keluargaId, {
            anakIds: [...keluarga.anakIds, anak.id]
        })
    }

    return anak
}
