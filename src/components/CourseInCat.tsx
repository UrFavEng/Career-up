import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface CourseInCatProps {
  e: {
    title: string;
    price: number | null;
    thumbnailUrl: string;
    id: number;
    outline: string[] | null;
    desc: string;
    updatedAt: string;
    level: string;
    teacherNames: string;
  };
}

const CourseInCat = ({ e }: CourseInCatProps) => {
  const [fav, setFav] = useState<boolean>(false);
  const handleFav = () => {
    setFav(!fav);
  };
  function formatDate(dateString: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
  }
  return (
    <div className="flex cursor-pointer  gap-3 basis-[400px] bg-background hover:bg-[#F5F5F5] border-2 shadow-md hover:shadow-2xl hover:scale-105 transition">
      <div className="w-[40%]">
        <img src={e.thumbnailUrl} alt="" className="  object-contain" />
      </div>
      <div className=" flex flex-col justify-between w-[55%] pr-4 py-2">
        <div>
          <h1 className=" leading-6 text-[22px] font-bold text-text flex items-center justify-between w-full">
            {e.title}{" "}
            <span className="text-[14px] font-bold text-primary">
              {e.price ? e.price : "Free"}
            </span>
          </h1>
          <h5 className=" font-medium text-[14px] text-accent-1">
            {e.teacherNames}
          </h5>
          <p className=" text-[12px] font-bold">
            {e.level} - {formatDate(e.updatedAt)}
          </p>
        </div>
        <div className=" flex gap-2">
          <button className=" py-1 font-medium text-[16px] w-[90px] text-secondary hover:text-white transition bg-primary">
            Add to cart
          </button>
          <span
            onClick={() => handleFav()}
            className=" text-[38px] text-primary"
          >
            {fav ? <MdFavorite /> : <MdFavoriteBorder />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseInCat;
