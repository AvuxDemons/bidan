import { create } from 'zustand'
import { auth } from "@/lib/auth"
import { User } from "next-auth"

interface UserState {
    user: User | null
    loading: boolean
    error: Error | null
    fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,
    fetchUser: async () => {
        try {
            set({ loading: true })
            const session = await auth()
            set({ user: session?.user ?? null })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ loading: false })
        }
    }
}))
