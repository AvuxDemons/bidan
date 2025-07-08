'use client';

import { MdFamilyRestroom } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKeluarga } from '@/hooks/useKeluarga';
import { Input } from '@/components/ui/HeroUI';

const Page = () => {
  const [noKK, setNoKK] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { keluargaList, error: fetchError } = useKeluarga();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\d{16}$/.test(noKK)) {
      setError('Nomor KK harus terdiri dari 16 digit angka.');
      return;
    }

    const keluarga = keluargaList.find((item) => item.no_kk === noKK);

    if (keluarga) {
      router.push(`/user/keluarga/${keluarga.id}`);
    } else {
      setError('Nomor KK tidak ditemukan. Silakan periksa kembali.');
    }
  };

  return (
    <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-xl bg-white p-6 md:p-8 min-h-screen md:min-h-[80vh] md:mt-14 transition-all duration-300">
      <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#3D2C17] mb-6 sm:mb-8">
        Verifikasi Nomor KK
      </h1>

      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="bg-[#FAF5EF] w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-sm">
            <MdFamilyRestroom className="text-primary w-14 h-14 sm:w-16 sm:h-16" />
            {/* ganti ke text-primary */}
          </div>
        </div>

        <div className="text-center space-y-2 px-2">
          <h2 className="text-base sm:text-lg font-medium text-[#3D2C17]">
            Masukkan Nomor Kartu Keluarga
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Nomor KK diperlukan untuk verifikasi data agar proses berikutnya dapat dilanjutkan dengan benar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-1">
          <div>
            <div className="mb-1 flex justify-between text-sm text-[#3D2C17]">
              <label htmlFor="nokk" className="font-medium">
                Nomor KK
              </label>
              <span className="text-xs text-gray-400">16 digit</span>
            </div>
            <Input
              type="text"
              id="nokk"
              name="nokk"
              value={noKK}
              onChange={(e) => setNoKK(e.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={16}
              placeholder="Contoh: 1234567890123456"
              required
            />

          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          {fetchError && (
            <div className="text-sm text-red-500 text-center">{fetchError.message}</div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition active:scale-[0.98]"
          >
            Lanjutkan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
