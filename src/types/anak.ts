export interface Anak {
    id: string
    nama: string
    tanggalLahir: Date
    jenisKelamin: 'L' | 'P'
    keluargaId: string
    createdAt?: Date
    updatedAt?: Date
}
