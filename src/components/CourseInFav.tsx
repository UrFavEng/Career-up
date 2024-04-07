import { FaHandPointRight } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { useDeleteFavMutation } from "../store/apislice";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface Course {
  allowPoints: boolean;
  beneficiaries: null | any; // You may replace 'any' with a more specific type if known
  categoryId: number;
  createdAt: string;
  deletedAt: string | null;
  desc: string;
  id: number;
  lang: string;
  level: string;
  outline: string[];
  prerequisites: string[];
  previewVideoUrl: string | null;
  price: number;
  status: string;
  subtitle: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
  views: number;
}

interface CourseArrayElement {
  course: Course;
  courseId: number;
  userId: number;
}
interface CourseInFavProps {
  course: CourseArrayElement;
  numOfPages: number;
}
const CourseInFav = ({ course, numOfPages }: CourseInFavProps) => {
  const [deleteFav, { isLoading }] = useDeleteFavMutation();
  console.log(numOfPages);
  const deleteFavF = () => {
    deleteFav(course.course.id)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
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
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/Course/${course.courseId}`)}
      className="flex mt-12 parent-details-course relative cursor-pointer flex-col md:flex-row gap-3 basis-[175px] sm:basis-[185px] md:basis-[355px] lg:basis-[400px] bg-background hover:bg-[#F5F5F5] border-2 shadow-md hover:shadow-2xl hover:scale-105 transition"
    >
      <div className=" hidden border-primary border-[1px] w-[100%] min-h-[80%]  details-course md:block absolute bg-white py-2 px-3 right-[0px] z-50 top-[-100px]">
        <h1 className=" font-semibold text-[22px] text-text">
          What'll you learn?
        </h1>
        <ul className=" text-[12px] font-semibold leading-3 flex flex-col gap-1 mt-1">
          {course.course.outline ? (
            <>
              {course.course.outline?.map((e) => (
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
        <img
          src={course.course.thumbnailUrl}
          alt=""
          className="  object-contain"
        />
      </div>
      <div className=" flex flex-col justify-between md:w-[55%] px-2 gap-4 md:gap-0 md:pr-4 py-2">
        <div>
          <h1 className=" leading-6 text-[22px] font-bold text-text flex items-center justify-between w-full">
            {course.course.title}{" "}
            <span className="text-[14px] font-bold text-primary">
              {course.course.price ? `${course.course.price} $` : "Free"}
            </span>
          </h1>
          <h5 className=" font-medium text-[14px] text-accent-1">
            {course.course.subtitle ? `${course.course.subtitle} - ` : ""}
            {course.course.views} Views
          </h5>
          <p className=" text-[12px] font-bold">
            {course.course.level} -{" "}
            {course.course.updatedAt && formatDate(course.course.updatedAt)}
          </p>
        </div>
        <div className=" flex gap-2 items-center">
          <button className=" py-1 font-medium text-[16px] w-[90px] text-secondary hover:text-white transition bg-primary">
            Add to cart
          </button>
          {isLoading ? (
            <div className="">
              {" "}
              <Hourglass
                visible={true}
                height="25"
                width="25"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#EC5252", "#ec525252"]}
              />
            </div>
          ) : (
            <span
              onClick={() => deleteFavF()}
              className={` text-[38px] text-primary`}
            >
              <MdFavorite />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInFav;
