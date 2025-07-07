interface DefaultData {
    id: string
    createdAt: Date
    updatedAt: Date
}

interface AnggotaKeluarga extends DefaultData {
    nik: string
    nama_lengkap: string
    ttl: string
    golongan_darah: string
}

interface OrangTua extends AnggotaKeluarga {
    agama: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Budha' | 'Konghucu'
    no_telepon: string
    pekerjaan: string
    pendidikan_terakhir: string
}