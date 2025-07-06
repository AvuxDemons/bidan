export interface Keluarga {
    id: string
    userId: string // Links to auth user
    namaKeluarga: string
    alamat: string
    ayahId: string
    ibuId: string
    anakIds: string[]
    createdAt: Date
    updatedAt: Date
}

export interface Ayah {
    id: string
    nama: string
    tanggalLahir: Date
    pekerjaan: string
    alamat: string
    keluargaId: string
}

export interface Ibu {
    id: string
    nama: string
    tanggalLahir: Date
    pekerjaan: string
    alamat: string
    keluargaId: string
}

export interface Anak {
    id: string
    nama: string
    tanggalLahir: Date
    jenisKelamin: 'L' | 'P'
    keluargaId: string
}
