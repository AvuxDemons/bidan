import { create } from 'zustand'
import { getAyahByKeluargaId } from "@/server/ayah"
import { Ayah } from "@/types/keluarga"

interface AyahState {
    ayah: Ayah | null
    loading: boolean
    error: Error | null
    fetchAyah: (keluargaId: string) => Promise<void>
}

export const useAyahStore = create<AyahState>((set) => ({
    ayah: null,
    loading: false,
    error: null,
    fetchAyah: async (keluargaId: string) => {
        try {
            set({ loading: true })
            const data = await getAyahByKeluargaId(keluargaId)
            set({ ayah: data })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ loading: false })
        }
    }
}))
