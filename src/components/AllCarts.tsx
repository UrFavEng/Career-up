// import { useDeleteCartMutation } from "../store/apislice";

import { img2 } from "../assests";
import { useGetAllCartQuery } from "../store/apislice";
import { Hourglass } from "react-loader-spinner";
import CourseInCart from "./CourseInCart";

const AllCarts = () => {
  const { data, isLoading, isFetching, error } = useGetAllCartQuery();
  const totalPrices = data?.payload.courses.reduce(
    (acc, current) => acc + (current.price ?? 0),
    0
  );
  const totalPriceDisplay =
    totalPrices === 0 ? "Free" : totalPrices?.toString();

  console.log(totalPriceDisplay);
  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col">
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
              <h4 className=" text-[28px] font-semibold text-primary flex gap-1 items-center">
                {" "}
                <span className=" text-text text-[20px]">Price:</span>{" "}
                {totalPriceDisplay}
              </h4>
              <div className=" z-0 flex gap-3 flex-row flex-wrap items-center justify-center pt-8">
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
                      <CourseInCart course={Course} />
                    ))}
                  </>
                )}
              </div>
            </>
          )}{" "}
        </>
      )}{" "}
      <div className=" flex justify-center items-center">
        <div className=" px-8 md:px-2 py-4 sm:py-8 md:py-4 w-[300px] sm:w-[95%] lg:w-[80%]  bg-white border-2 shadow-md my-4 flex-col sm:flex-row flex justify-center items-center gap-8 ">
          <div className=" max-w-[380px] md:w-[30%] lg:w-[30%]">
            <img src={img2} alt="" className=" object-contain w-full" />
          </div>
          <div className=" md:w-[55%] lg:w-[60%] flex flex-col gap-4">
            <h3 className=" font-bold text-[22px] leading-6 md:text-[26px] text-text">
              Unleash Your Potential: Invest in Knowledge Today!
            </h3>
            <p className="  text-accent-1 leading-[18px] w-[95%]">
              nvest in your future success and expand your knowledge horizons!
              Start your learning journey today by enrolling in courses to
              achieve both personal and professional growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCarts;
