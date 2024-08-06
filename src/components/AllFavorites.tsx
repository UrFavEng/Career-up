// import { Pagination } from "flowbite-react";
import { useGetAllFavQuery } from "../store/apislice";
import CourseInFav from "./CourseInFav";
// import { useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { img4 } from "../assests";

const AllFavorites = () => {
  // const onPageChange = (page: number) => setCurrentPage(page);
  // const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isFetching } = useGetAllFavQuery();
  console.log(data, error);
  return (
    <div className="min-h-[68vh]">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {error?.status == 401 ? (
        <p className=" py-[80px] flex justify-center items-center text-primary font-bold text-[28px]">
          You must login first{" "}
        </p>
      ) : (
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {error?.status == 500 ? (
            <p className=" pt-40 pb-72 flex justify-center items-center text-primary font-medium text-[18px]">
              Something went wrong on our end. Please try again laters
            </p>
          ) : (
            <>
              {" "}
              <div className=" z-0 flex gap-3 flex-row flex-wrap items-center justify-center pt-0 ">
                {isLoading || isFetching ? (
                  <div className="pt-2">
                    {" "}
                    <Hourglass
                      visible={true}
                      height="55"
                      width="55"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={["#EC5252", "#ec525252"]}
                    />
                  </div>
                ) : (
                  <>
                    {data?.payload.courses.map((Course) => (
                      <CourseInFav
                        course={Course}
                        numOfPages={data.payload.numOfPages}
                      />
                    ))}
                  </>
                )}
              </div>{" "}
            </>
          )}
        </>
      )}

      {/* <div className=" pb-8 flex w-[325px] mx-auto items-center justify-center overflow-x-auto sm:justify-center pages-Courses-Cat pt-4">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={data?.payload.numOfPages ? data?.payload.numOfPages : 1}
          onPageChange={onPageChange}
          previousLabel=" "
          nextLabel=" "
          showIcons
        />
      </div> */}
      <div className=" flex justify-center items-center">
        <div className=" px-8 md:px-2 py-4 sm:py-8 md:py-8 w-[300px] sm:w-[95%] lg:w-[80%]  bg-white border-2 shadow-md my-4 flex-col sm:flex-row flex justify-center items-center gap-8">
          <div className=" max-w-[225px] md:w-[30%] lg:w-[25%]">
            <img src={img4} alt="" className=" object-contain w-full" />
          </div>
          <div className=" md:w-[55%] lg:w-[60%] flex flex-col gap-4">
            <h3 className=" font-bold text-[22px] leading-6 md:text-[26px] text-text">
              Empower yourself with the key to success - invest in knowledge
              today!
            </h3>
            <p className="  text-accent-1 leading-[18px] w-[95%]">
              Take control of your future and expand your knowledge base! Invest
              in courses now to refine your skills and fulfill your personal and
              career objectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFavorites;
