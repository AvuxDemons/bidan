import { useEffect, useState } from "react"
import { getAyahByKeluargaId } from "@/server/ayah"
import { Ayah } from "@/types/keluarga"

export function useAyah(keluargaId: string | undefined) {
    const [ayah, setAyah] = useState<Ayah | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchAyah = async () => {
            try {
                setLoading(true)
                if (keluargaId) {
                    const data = await getAyahByKeluargaId(keluargaId)
                    setAyah(data)
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchAyah()
    }, [keluargaId])

    return { ayah, loading, error }
}
