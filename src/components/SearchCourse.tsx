import { useParams } from "react-router-dom";
import { useGetCoursesSearchQuery } from "../store/apislice";
import { Hourglass } from "react-loader-spinner";
import CourseInSearch from "./CourseInSearch";
import { useEffect } from "react";

const SearchCourse = () => {
  const { nameCourse } = useParams<string>();

  const { data, isLoading, error, refetch, isFetching } =
    useGetCoursesSearchQuery(nameCourse);
  useEffect(() => {
    refetch();
  }, [nameCourse]);
  console.log(data, error);
  return (
    <>
      <div className=" container py-4 min-h-[75vh]">
        <h1 className=" font-bold text-[40px] py-4">
          {data?.payload.courses.length} results for "
          <span className=" text-primary">{nameCourse}</span>"
        </h1>
        <div className=" z-0 flex gap-3 flex-row flex-wrap items-center justify-center">
          {isLoading || isFetching ? (
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
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {error?.status == 400 ? (
                <p className=" text-primary font-medium text-[18px]">
                  {"Please enter at least 2 characters to search."}
                </p>
              ) : (
                <>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {error?.status == 500 ? (
                    <p className=" text-primary font-medium text-[18px]">
                      Something went wrong on our end. Please try again laters
                    </p>
                  ) : (
                    <>
                      {" "}
                      {data?.payload.courses.map((e) => (
                        <CourseInSearch e={e} key={e.id} />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchCourse;
