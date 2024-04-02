import { Pagination } from "flowbite-react";
import { useGetAllFavQuery } from "../store/apislice";
import CourseInFav from "./CourseInFav";
import { useState } from "react";
import { Hourglass } from "react-loader-spinner";

const AllFavorites = () => {
  const onPageChange = (page: number) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllFavQuery();
  console.log(data?.payload.numOfPages);
  return (
    <>
      {" "}
      <div className=" z-0 flex gap-3 flex-row flex-wrap items-center justify-center pt-8 min-h-[60vh]">
        {isLoading ? (
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
      <div className=" pb-8 flex w-[325px] mx-auto items-center justify-center overflow-x-auto sm:justify-center pages-Courses-Cat pt-4">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={data?.payload.numOfPages ? data?.payload.numOfPages : 1}
          onPageChange={onPageChange}
          previousLabel=" "
          nextLabel=" "
          showIcons
        />
      </div>
    </>
  );
};

export default AllFavorites;
