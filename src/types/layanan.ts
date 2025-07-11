interface Layanan extends DefaultData {
    nama: string;
    deskripsi?: string;
    jenis: 'ibu' | 'anak' | 'umum' | string;
}