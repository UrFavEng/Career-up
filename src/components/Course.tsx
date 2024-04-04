import { useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useEffect, useRef } from "react";
import {
  useAddFavMutation,
  useDeleteFavMutation,
  useAddCartMutation,
} from "../store/apislice";
import { AddFavRES } from "../types/types.model";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface CourseProps {
  CourseData: {
    isFaved?: boolean | undefined;
    isInCart?: boolean | undefined;
    desc: string;
    id: number;
    level: string;
    outline: string[] | null;
    thumbnailUrl: string;
    price: null | number;
    title: string;
    teacherNames: string;
    updatedAt: string;
  };
}

const Course = ({ CourseData }: CourseProps) => {
  const [fav, setFav] = useState<boolean>(false);
  // const handleSuccess = () => {
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: "Done",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // };
  const handleErr400 = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Already in Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const [addFav] = useAddFavMutation();
  const [addCart] = useAddCartMutation();
  const [deleteFav] = useDeleteFavMutation();
  const AddFavF = () => {
    addFav({ body: { courseId: CourseData.id } })
      .unwrap()
      .then((fulfilled: AddFavRES) => {
        console.log(fulfilled);
        setFav(true);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  const AddCartF = () => {
    addCart({ body: { courseId: CourseData.id } })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
        if (rejected.status == 400) {
          handleErr400();
        }
      });
  };
  const deleteFavF = () => {
    deleteFav(CourseData.id)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setFav(false);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
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
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={measureDistanceToRight}
      ref={imageRef}
      className="parent-details-course bg-transparent  cursor-pointer"
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
          <div className=" text-[14px] font-medium">
            {formatDate(CourseData.updatedAt)}
          </div>
          <p className=" text-[12px] py-1 font-medium text-text leading-[13px]">
            {CourseData.desc}
          </p>
          <div>
            <ul className=" text-[12px] font-semibold leading-3 flex flex-col gap-1 mt-1">
              {CourseData.outline ? (
                <>
                  {" "}
                  {CourseData.outline?.map((e) => (
                    <li className="flex gap-2" key={e}>
                      <span className=" text-primary text-[16px]">
                        <FaHandPointRight />
                      </span>{" "}
                      {e}
                    </li>
                  ))}
                </>
              ) : (
                "No Outline"
              )}
            </ul>
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <button
            onClick={() => AddCartF()}
            className=" w-[80%] bg-primary text-secondary hover:text-white font-semibold text-[18px] py-2 px-6"
          >
            Add to cart
          </button>
          <span
            onClick={() => AddFavF()}
            className={`  text-[38px] text-primary ${fav ? "hidden" : "block"}`}
          >
            {/* {fav ? */}

            <MdFavoriteBorder />
            {/* //  : <MdFavoriteBorder />} */}
          </span>
          <span
            onClick={() => deleteFavF()}
            className={`text-[38px] text-primary ${fav ? "block" : " hidden"}`}
          >
            <MdFavorite />
          </span>
        </div>
      </div>
      <div className="" onClick={() => navigate(`/Course/${CourseData.id}`)}>
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
