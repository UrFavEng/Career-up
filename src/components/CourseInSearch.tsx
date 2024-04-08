import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  useAddCartMutation,
  useAddFavMutation,
  useDeleteFavMutation,
} from "../store/apislice";
import { CoursesSearch } from "../types/types.model";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface CourseInCatProps {
  e: CoursesSearch;
}

const CourseInSearch = ({ e }: CourseInCatProps) => {
  const handleSuss = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Done`,
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handleErr400 = (type: string) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Already in ${type}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleErr401 = () => {
    Swal.fire("You must login first!");
  };
  const [fav, setFav] = useState<boolean>(false);
  const [addFav] = useAddFavMutation();
  const [addCart] = useAddCartMutation();
  const [deleteFav] = useDeleteFavMutation();
  const AddFavF = () => {
    addFav({ body: { courseId: e.id } })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setFav(true);
      })
      .catch((rejected) => {
        console.error(rejected);
        if (rejected.status == 401) {
          handleErr401();
        }
        if (rejected.status == 400) {
          handleErr400("Favorites");
        }
      });
  };
  const deleteFavF = () => {
    deleteFav(e.id)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setFav(false);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  const AddCartF = () => {
    addCart({ body: { courseId: e.id } })
      .unwrap()
      .then((fulfilled) => {
        handleSuss();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
        if (rejected.status == 400) {
          handleErr400("cart");
        }
        if (rejected.status == 401) {
          handleErr401();
        }
      });
  };
  const navigate = useNavigate();

  return (
    <div className="flex parent-details-course relative cursor-pointer flex-col md:flex-row gap-3 basis-[175px] sm:basis-[185px] md:basis-[355px] lg:basis-[400px] bg-background hover:bg-[#F5F5F5] border-2 shadow-md hover:shadow-2xl hover:scale-105 transition">
      <div className=" hidden border-primary border-[1px] w-[100%] min-h-[80%]  details-course md:block absolute bg-white py-2 px-3 right-[0px] z-50 top-[-100px]">
        <h1 className=" font-semibold text-[22px] text-text">
          What'll you learn?
        </h1>
      </div>
      <div onClick={() => navigate(`/Course/${e.id}`)} className="md:w-[40%]">
        <img src={e.thumbnailUrl} alt="" className="  object-contain" />
      </div>
      <div className=" flex flex-col justify-between md:w-[55%] px-2 gap-4 md:gap-0 md:pr-4 py-2">
        <div onClick={() => navigate(`/Course/${e.id}`)}>
          <h1 className=" leading-6 text-[22px] font-bold text-text flex items-center justify-between w-full">
            {e.title}{" "}
            <span className="text-[14px] font-bold text-primary">
              {e.price ? e.price : "Free"}
            </span>
          </h1>
          <h5 className=" font-medium text-[14px] text-accent-1">
            {e.teachers.map((t) => `${t.fullname} ${" "}`)}
          </h5>
          <p className=" text-[12px] font-bold">{e.level}</p>
        </div>
        <div className=" flex gap-2">
          <button
            onClick={() => AddCartF()}
            className=" py-1 font-medium text-[16px] w-[90px] text-secondary hover:text-white transition bg-primary"
          >
            Add to cart
          </button>
          <span
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
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseInSearch;
