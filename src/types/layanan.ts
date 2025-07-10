interface Layanan extends DefaultData {
    nama: string;
    jenis: 'ibu' | 'anak' | 'umum'| string;
    deskripsi?: string;
    harga?: number;
}
