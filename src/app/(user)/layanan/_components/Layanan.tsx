import { MdChevronRight } from "react-icons/md";

const Layanan = ({ layanan }: { layanan: Layanan[] }) => {
  return layanan.map((item: Layanan, index: number) => (
    <div
      key={index}
      className={`group flex items-center justify-between p-4 md:p-6 rounded-xl border-2 border-default-500 shadow-md hover:shadow-lg hover:border-primary hover:scale-105 transition cursor-pointer`}
    >
      <div className="flex flex-col">
        <h3 className="text-base md:text-lg font-semibold group-hover:text-primary transition capitalize">
          {item.nama}
        </h3>
        <p className="text-xs md:text-sm">{item.deskripsi}</p>
      </div>
      <MdChevronRight
        className="group-hover:text-primary group-hover:translate-x-2 transition"
        size={24}
      />
    </div>
  ));
};

export default Layanan;
