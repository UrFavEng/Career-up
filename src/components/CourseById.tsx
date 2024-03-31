import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../store/apislice";

const CourseById = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const { data } = useGetCourseByIdQuery(id);
  console.log(data);
  return (
    <div className=" font-extrabold text-[32px]  h-[70vh]">لسه متعملتش</div>
  );
};

export default CourseById;
