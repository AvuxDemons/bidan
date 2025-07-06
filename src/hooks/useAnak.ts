import { useEffect, useState } from "react"
import { getAnakByKeluargaId } from "@/server/anak"
import { Anak } from "@/types/keluarga"

export function useAnak(keluargaId: string | undefined) {
    const [anakList, setAnakList] = useState<Anak[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchAnak = async () => {
            try {
                setLoading(true)
                if (keluargaId) {
                    const data = await getAnakByKeluargaId(keluargaId)
                    setAnakList(data)
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchAnak()
    }, [keluargaId])

    return { anakList, loading, error }
}
