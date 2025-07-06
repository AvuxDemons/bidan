import { useEffect, useState } from "react"
import { getKeluargaByUserId } from "@/server/keluarga"
import { Keluarga } from "@/types/keluarga"

export function useKeluarga(userId: string) {
    const [keluarga, setKeluarga] = useState<Keluarga | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchKeluarga = async () => {
            try {
                setLoading(true)
                const data = await getKeluargaByUserId(userId)
                setKeluarga(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchKeluarga()
        }
    }, [userId])

    return { keluarga, loading, error }
}
