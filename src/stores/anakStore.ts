import { create } from 'zustand'
import { getAnakByKeluargaId } from "@/server/anak"
import { Anak } from "@/types/keluarga"

interface AnakState {
    anakList: Anak[]
    loading: boolean
    error: Error | null
    fetchAnak: (keluargaId: string) => Promise<void>
}

export const useAnakStore = create<AnakState>((set) => ({
    anakList: [],
    loading: false,
    error: null,
    fetchAnak: async (keluargaId: string) => {
        try {
            set({ loading: true })
            const data = await getAnakByKeluargaId(keluargaId)
            set({ anakList: data })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ loading: false })
        }
    }
}))
