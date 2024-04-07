// import { useState } from "react";
import { FaHandPointRight } from "react-icons/fa6";
// import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  useAddCartMutation,
  // useAddFavMutation,
  // useDeleteFavMutation,
} from "../store/apislice";
import { TeacherSearchCourses } from "../types/types.model";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface CourseInCatProps {
  e: {
    title: string;
    price: number | null;
    subtitle?: string | null;
    thumbnailUrl: string;
    id: number;
    outline: string[] | null;
    desc: string;
    updatedAt: string;
    level: string;
    lang?: string;
    teacherNames?: string;
    teachers?: TeacherSearchCourses;
    totalLength?: null | number;
  };
}

const CourseInCat = ({ e }: CourseInCatProps) => {
  const handleSuss = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleErr400 = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Already in Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleErr401 = () => {
    Swal.fire("You must login first!");
  };
  // const [fav, setFav] = useState<boolean>(false);

  // const [addFav] = useAddFavMutation();
  const [addCart] = useAddCartMutation();
  const AddCartF = () => {
    addCart({ body: { courseId: e.id } })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        handleSuss();
      })
      .catch((rejected) => {
        console.error(rejected);
        if (rejected.status == 400) {
          handleErr400();
        }
        if (rejected.status == 401) {
          handleErr401();
        }
      });
  };
  // const [deleteFav] = useDeleteFavMutation();

  // const AddFavF = () => {
  //   addFav({ body: { courseId: e.id } })
  //     .unwrap()
  //     .then((fulfilled) => {
  //       console.log(fulfilled);
  //       setFav(true);
  //     })
  //     .catch((rejected) => {
  //       if (rejected.status == 400) {
  //         handleErr400();
  //       }
  //       if (rejected.status == 401) {
  //         handleErr401();
  //       }
  //       console.error(rejected);
  //     });
  // };
  // const deleteFavF = () => {
  //   deleteFav(e.id)
  //     .unwrap()
  //     .then((fulfilled) => {
  //       console.log(fulfilled);
  //       setFav(false);
  //     })
  //     .catch((rejected) => {
  //       console.error(rejected);
  //     });
  // };

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
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/Course/${e.id}`)}
      className="flex parent-details-course relative cursor-pointer flex-col md:flex-row gap-3 basis-[175px] sm:basis-[185px] md:basis-[355px] lg:basis-[400px] bg-background hover:bg-[#F5F5F5] border-2 shadow-md hover:shadow-2xl hover:scale-105 transition"
    >
      <div className=" hidden border-primary border-[1px] w-[100%] min-h-[80%]  details-course md:block absolute bg-white py-2 px-3 right-[0px] z-50 top-[-100px]">
        <h1 className=" font-semibold text-[22px] text-text">
          What'll you learn?
        </h1>
        <ul className=" text-[12px] font-semibold leading-3 flex flex-col gap-1 mt-1">
          {e.outline ? (
            <>
              {e.outline?.map((e) => (
                <li className="flex gap-2 items-start justify-between">
                  <span className=" text-primary text-[16px]">
                    <FaHandPointRight />
                  </span>
                  {e}
                </li>
              ))}
            </>
          ) : (
            "Not added yet"
          )}
        </ul>
      </div>
      <div className="md:w-[40%]">
        <img src={e.thumbnailUrl} alt="" className="  object-contain" />
      </div>
      <div className=" flex flex-col justify-between md:w-[55%] px-2 gap-4 md:gap-0 md:pr-4 py-2">
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
            {e.level} - {e.updatedAt && formatDate(e.updatedAt)}
          </p>
        </div>
        <div className=" flex gap-2">
          <button
            onClick={() => AddCartF()}
            className=" py-1 font-medium text-[16px] w-[90px] text-secondary hover:text-white transition bg-primary"
          >
            Add to cart
          </button>
          {/* <span
            onClick={() => AddFavF()}
            className={` text-[38px] text-primary ${fav ? "hidden" : "block"}`}
          >
            <MdFavoriteBorder />
          </span>
          <span
            onClick={() => deleteFavF()}
            className={` text-[38px] text-primary ${fav ? "block" : " hidden"}`}
          >
            <MdFavorite />
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default CourseInCat;
