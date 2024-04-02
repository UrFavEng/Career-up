import { useParams } from "react-router-dom";
import { useGetCoursesSearchQuery } from "../store/apislice";
import { Hourglass } from "react-loader-spinner";
import CourseInSearch from "./CourseInSearch";

const SearchCourse = () => {
  const { nameCourse } = useParams<string>();

  const { data, isLoading } = useGetCoursesSearchQuery(nameCourse);
  console.log(data?.payload.courses);
  return (
    <>
      <div className=" container py-4 min-h-[75vh]">
        <h1 className=" font-bold text-[40px] py-4">
          {data?.payload.courses.length} results for "
          <span className=" text-primary">{nameCourse}</span>"
        </h1>
        <div className=" z-0 flex gap-3 flex-row flex-wrap items-center justify-center">
          {isLoading ? (
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#EC5252", "#ec525252"]}
            />
          ) : (
            <>
              {" "}
              {data?.payload.courses.map((e) => (
                <CourseInSearch e={e} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchCourse;
