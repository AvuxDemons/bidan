import { useEffect, useState } from "react"
import { auth } from "@/lib/auth"
import { User } from "next-auth"

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const session = await auth()
                setUser(session?.user ?? null)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return { user, loading, error }
}
