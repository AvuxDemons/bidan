import { create } from 'zustand'
import { getKeluargaByUserId } from "@/server/keluarga"
import { Keluarga } from "@/types/keluarga"

interface KeluargaState {
    keluarga: Keluarga | null
    loading: boolean
    error: Error | null
    fetchKeluarga: (userId: string) => Promise<void>
}

export const useKeluargaStore = create<KeluargaState>((set) => ({
    keluarga: null,
    loading: false,
    error: null,
    fetchKeluarga: async (userId: string) => {
        try {
            set({ loading: true })
            const data = await getKeluargaByUserId(userId)
            set({ keluarga: data })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ loading: false })
        }
    }
}))
