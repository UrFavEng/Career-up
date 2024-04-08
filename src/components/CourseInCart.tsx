import { useNavigate } from "react-router-dom";
import { useDeleteCartMutation } from "../store/apislice";

interface CourseProps {
  course: {
    courseId: number;
    price: number | null;
    teacherNames: string;
    thumbnailUrl: string;
    title: string;
    userId: number;
  };
}
const CourseInCart = ({ course }: CourseProps) => {
  const [deleteCart] = useDeleteCartMutation();
  const deleteFavF = () => {
    deleteCart(course.courseId)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  const navigate = useNavigate();

  return (
    <div className="flex  relative cursor-pointer flex-col md:flex-row gap-3 basis-[175px] sm:basis-[185px] md:basis-[355px] lg:basis-[400px] bg-background hover:bg-[#F5F5F5] border-2 shadow-md hover:shadow-2xl hover:scale-105 transition">
      <div
        onClick={() => navigate(`/Course/${course.courseId}`)}
        className="md:w-[40%]"
      >
        <img src={course.thumbnailUrl} alt="" className="  object-contain" />
      </div>
      <div className=" justify-between flex flex-col  md:w-[55%] px-2 gap-4 md:gap-0 md:pr-4 py-2">
        <div onClick={() => navigate(`/Course/${course.courseId}`)}>
          <h1 className=" leading-6 text-[22px] font-bold text-text flex items-center justify-between w-full">
            {course.title}
          </h1>
          <p className=" font-medium text-[14px] text-accent-1">
            {course.teacherNames}
          </p>
          <p>{course.price ? `${course.price} $` : `Free`}</p>
        </div>

        <button
          onClick={() => deleteFavF()}
          className=" bg-primary w-fit px-2 py-1 text-text font-medium text-[17px]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseInCart;
