'use client';

import { useRouter } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/HeroUI';
import {
  MdPregnantWoman,
  MdChildCare,
  MdFamilyRestroom,
  MdHelpOutline,
  MdChevronRight,
} from 'react-icons/md';

const layananList = [
  {
    title: 'Layanan Ibu',
    description: 'Konsultasi dan perawatan kesehatan ibu',
    path: '/user/layanan/ibu',
    icon: <MdPregnantWoman className="text-2xl text-primary" />,
    bgColor: 'bg-pink-50',
  },
  {
    title: 'Layanan Anak',
    description: 'Perawatan dan pemeriksaan kesehatan anak',
    path: '/user/layanan/anak',
    icon: <MdChildCare className="text-2xl text-primary" />,
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Paket Ibu & Anak',
    description: 'Layanan komprehensif untuk ibu dan anak',
    path: '/user/layanan/ibu-anak',
    icon: <MdFamilyRestroom className="text-2xl text-primary" />,
    bgColor: 'bg-purple-50',
  },
];


const Page = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Section className="flex flex-col gap-10 w-full max-w-4xl p-6 md:p-16">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase">
            Layanan
          </h1>
          <p className="text-sm text-default-600">
            Silakan pilih layanan yang Anda butuhkan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {layananList.map(({ title, description, icon, path, bgColor }) => (
            <div
              key={title}
              onClick={() => router.push(path)}
              className={`group cursor-pointer ${bgColor} p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition duration-200 relative`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow">
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
              <MdChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-hover:text-primary transition" />
            </div>
          ))}
        </div>

        <div className="text-center space-y-1">
          <Button
            onClick={() => router.push('/bantuan')}
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-700"
            variant="light"
          >
            Butuh bantuan?
            <MdHelpOutline className="w-5 h-5" />
          </Button>
          <p className="text-xs text-default-500">
            Tim kami siap membantu Anda 24/7
          </p>
        </div>
      </Section>
    </div>
  );
};

export default Page;
