interface Anak extends AnggotaKeluarga {
    jenis_kelamin: 'L' | 'P' | null
    anak_ke: number
    bpjs?: string
    keterangan?: string
    keluarga_id: string
    ayah_id: string
}
