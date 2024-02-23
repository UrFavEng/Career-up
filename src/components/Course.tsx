import { useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdArrowDropleft } from "react-icons/io";
interface CourseProps {
  CourseData: {
    id: number;
    thumbnailUrl: string;
    price: null | number;
    title: string;
    teacherNames: string;
  };
}

const Course = ({ CourseData }: CourseProps) => {
  const [fav, setFav] = useState<boolean>(false);
  const handleFav = () => {
    setFav(!fav);
  };
  return (
    <div className="parent-details-course bg-transparent ">
      <div className=" flex details-course gap-2  justify-between flex-col p-4 absolute top-[0px] left-[90%] z-50 w-[115%] min-h-[100%] bg-[#fff] border-2 shadow-md">
        <div className=" text-[40px] text-primary right-[94%] top-[50%] translate-y-[-50%] absolute">
          {" "}
          <IoMdArrowDropleft />
        </div>
        <div>
          {" "}
          <h1 className=" capitalize text-[24px] font-semibold text-primary leading-[24px]">
            {CourseData.title}
          </h1>
          <div className=" text-[14px] font-medium">Updated February 2024</div>
          <p className=" text-[12px] py-1 font-medium text-text leading-[13px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            saepe nisi dolor quae iusto illum? Pariatur ipsam doloremque
            adipisci sint!
          </p>
          <div>
            <ul className=" text-[12px] font-semibold leading-3 flex flex-col gap-1 mt-1">
              <li className="flex gap-2">
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
                laboriosam eum laudantium a eaque! Voluptates.
              </li>

              <li className="flex gap-2">
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, dolor.
              </li>
              <li className="flex gap-2">
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, dolor.
              </li>
              <li className="flex gap-2">
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, dolor.
              </li>
              <li className="flex gap-2">
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, dolor.
              </li>

              <li className="flex gap-2">
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, dolor.
              </li>
              <li className="flex gap-2">
                {" "}
                <span className=" text-primary text-[16px]">
                  <FaHandPointRight />
                </span>{" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </li>
            </ul>
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <button className=" w-[80%] bg-primary text-secondary hover:text-white font-semibold text-[18px] py-2 px-6">
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
      <div className="">
        <img src={CourseData.thumbnailUrl} alt="" />
      </div>
      <div>
        <h4 className=" text-[20px] leading-[20px] mt-[10px] font-bold text-text">
          {CourseData.title}
        </h4>
        <p className=" text-[#6d6d6d] font-medium text-[14px]">
          {CourseData.teacherNames}
        </p>
        <p>{CourseData.price ? CourseData.price : "Free"}</p>
      </div>
    </div>
  );
};

export default Course;
