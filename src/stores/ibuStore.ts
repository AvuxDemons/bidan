import { create } from 'zustand'
import { getIbuByKeluargaId } from "@/server/bunda"
import { Ibu } from "@/types/keluarga"

interface IbuState {
    ibu: Ibu | null
    loading: boolean
    error: Error | null
    fetchIbu: (keluargaId: string) => Promise<void>
}

export const useIbuStore = create<IbuState>((set) => ({
    ibu: null,
    loading: false,
    error: null,
    fetchIbu: async (keluargaId: string) => {
        try {
            set({ loading: true })
            const data = await getIbuByKeluargaId(keluargaId)
            set({ ibu: data })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ loading: false })
        }
    }
}))
