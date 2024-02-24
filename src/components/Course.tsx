import { useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useEffect, useRef } from "react";
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
  const [distanceToRight, setDistanceToRight] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const measureDistanceToRight = () => {
    const imageElement = imageRef.current;
    if (imageElement) {
      const distance =
        window.innerWidth - imageElement.getBoundingClientRect().right;
      setDistanceToRight(distance);
    }
  };

  useEffect(() => {
    measureDistanceToRight();
  }, []);
  return (
    <div
      onMouseEnter={measureDistanceToRight}
      ref={imageRef}
      className="parent-details-course bg-transparent "
    >
      <div
        className={`hidden ${
          distanceToRight !== null && distanceToRight < 400
            ? "right-[60%] xl:right-[50%]"
            : "left-[60%] xl:left-[50%]"
        }  details-course md:flex gap-2   justify-between flex-col p-4 absolute top-[0px] 
         z-50 w-[320px] lg:w-[325px] xl:w-[325px] min-h-[100%] bg-[#fff] border-2 shadow-2xl`}
      >
        <div>
          <h1 className=" capitalize flex gap-1 items-center  text-[24px] font-semibold text-primary leading-[24px]">
            <span className=" text-accent-1 hover:text-text cursor-pointer">
              <IoArrowUndoSharp />{" "}
            </span>{" "}
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
          {CourseData.title}{" "}
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
