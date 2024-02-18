import { useNavigate } from "react-router-dom";
import { imageTeachingCourse } from "../assests";
import { teachingCourse } from "../types/types.model";

interface TeachingCourse {
  Courses: { courseId: number; teacherId: number; course: teachingCourse };
}
const TeachingCourses = ({ Courses }: TeachingCourse) => {
  const navigate = useNavigate();

  return (
    <div className="flex  border-2">
      <div className=" w-[150px]">
        <img src={imageTeachingCourse} alt="" />
      </div>
      <div className=" div-EditCourse w-full capitalize pl-6 py-4 flex flex-col justify-between relative">
        <div
          onClick={() => {
            navigate(`edit-course/${Courses.courseId}`);
          }}
          className=" cursor-pointer text-primary bg-[#e0e0e06b] absolute top-0 left-0 w-[100%] h-[100%]  justify-center items-center font-extrabold text-[20px] sm:text-[28px]"
        >
          Edit / manage course
        </div>
        <h1 className=" text-accent-1 font-bold text-[18px]">
          {Courses.course.title}
        </h1>
        <p className=" text-[15px]">
          status:{" "}
          <span className=" text-primary font-medium text-[17px]">
            {Courses.course.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeachingCourses;
