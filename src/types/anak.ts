interface Anak extends AnggotaKeluarga {
    jenis_kelamin: 'L' | 'P'
    anak_ke: number
    bpjs?: string
    keterangan?: string
}
