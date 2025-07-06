import { useEffect, useState } from "react"
import { getIbuByKeluargaId } from "@/server/bunda"
import { Ibu } from "@/types/keluarga"

export function useBunda(keluargaId: string | undefined) {
    const [ibu, setIbu] = useState<Ibu | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchIbu = async () => {
            try {
                setLoading(true)
                if (keluargaId) {
                    const data = await getIbuByKeluargaId(keluargaId)
                    setIbu(data)
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchIbu()
    }, [keluargaId])

    return { ibu, loading, error }
}
