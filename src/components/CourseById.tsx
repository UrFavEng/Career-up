import { useParams } from "react-router-dom";
import { useGetCourseByIdPublicQuery } from "../store/apislice";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Hourglass } from "react-loader-spinner";
import { MdBrowserUpdated } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import { IoMdStar } from "react-icons/io";
import { FaMobileAlt } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineRateReview } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiVideoBold } from "react-icons/pi";
// import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useEffect, useRef, useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import SectionInCourse from "./SectionInCourse";
import { IoInfinite } from "react-icons/io5";
import { TbCertificate } from "react-icons/tb";
import { img1 } from "../assests";
const CourseById = () => {
  const devRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (devRef.current) {
        const distanceFromTop = devRef.current.getBoundingClientRect().top;
        setIsVisible(distanceFromTop > -310);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { id } = useParams<{ id: string | undefined }>();
  const { data, isLoading } = useGetCourseByIdPublicQuery(id);

  const [value] = useState<number | null>(
    data?.payload.course.totalReviewsRate
  );
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className=" min-h-[77vh]  relative container py-4 ">
      {isLoading ? (
        <div className=" flex items-center justify-center h-full">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#EC5252", "#ec525252"]}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col-reverse lg:flex-row lg:justify-between relative">
            <div className=" lg:basis-[70%]">
              <div className=" hidden lg:flex items-center gap-1">
                <span className=" font-bold text-[28px] text-primary">
                  {data?.payload.course.category.categoryName}
                </span>
                <span className=" text-[18px] text-text">
                  <MdKeyboardArrowRight />
                </span>
                <span className=" text-[18px] text-accent-1 font-medium">
                  {" "}
                  {data?.payload.course.title}
                </span>
              </div>
              <h1 className=" hidden lg:block font-bold text-[32px] text-text mt-[-10px]">
                {data?.payload.course.title}{" "}
                {`${
                  data?.payload.course.subtitle
                    ? ` - ${data?.payload.course.subtitle}`
                    : ""
                }`}
              </h1>
              <p
                className={` hidden lg:block capitalize text-[18px] text-[#4d4d4d] font-medium mt-[-5px]`}
              >
                {data?.payload.course.desc}
              </p>
              <p className=" hidden lg:flex items-center gap-1">
                <p>
                  <span>{data?.payload.course.numOfEnrolledStudents}</span>{" "}
                  students
                </p>
                <p className=" flex items-center gap-1">
                  <span>({value ? value : 0})</span>
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    size="small"
                  />
                  <span>
                    ({data?.payload.course.numOfCourseReviews} ratings)
                  </span>
                </p>
              </p>
              <h3 className=" text-primary hidden lg:flex font-medium  items-center gap-1">
                Created by{" "}
                <p className=" text-text font-semibold text-[20px]">
                  {" "}
                  {data?.payload.course.teachers
                    .map((t) => t.fullname)
                    .join(" - ")}
                </p>
              </h3>
              <div className=" hidden lg:flex items-center pt-1 gap-4">
                <div className=" flex items-center gap-1">
                  <span className=" text-[22px] text-primary">
                    <MdBrowserUpdated />
                  </span>
                  <span className=" text-[12px] text-text font-semibold">
                    Last updated{" "}
                    <span className=" text-[14px] font-medium">
                      {" "}
                      {formatDate(data?.payload.course.updatedAt ?? "")}
                    </span>
                  </span>
                </div>
                <div className=" flex items-center gap-1">
                  <span className=" text-[18px] text-primary">
                    <MdLanguage />
                  </span>
                  <span className=" text-[14px] font-medium">
                    {data?.payload.course.lang == "ar" ? "Arabic" : "English"}
                  </span>
                </div>
                <div className=" flex items-center gap-1">
                  <span className=" text-[18px] text-primary">
                    <AiFillFire />
                  </span>
                  <span className=" text-[14px] font-medium">
                    {data?.payload.course.level}
                  </span>
                </div>
              </div>
              <div className="border-2 py-6 px-4 my-8 hidden lg:block ">
                <h3 className=" text-[20px] font-semibold text-text">
                  What you'll learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-5 ">
                  {data?.payload.course.outline &&
                    data?.payload.course.outline.map((O) => (
                      <p className=" flex items-start leading-[14px] gap-1 text-[14px]">
                        <span className=" text-primary text-[14px]">
                          <IoMdStar />
                        </span>{" "}
                        {O}
                      </p>
                    ))}
                </div>
              </div>
              <div className="  my-6">
                <h2 className=" text-primary font-semibold text-[28px] ">
                  Course content
                </h2>
                <p className=" font-medium text-[14px] text-accent-1">
                  {data?.payload.course.numOfSections} sections -{" "}
                  {data?.payload.course.numOfVideos} lectures -{" "}
                  {data?.payload.course.totalLength
                    ? (data?.payload.course.totalLength / 60).toFixed(1)
                    : 0}{" "}
                  m
                </p>
                <div className="mt-4 bg-[#e0e0e0] border-t-2 border-x-2 border-[#bcbcbc]">
                  {data?.payload.course.sections.map((sec) => (
                    <SectionInCourse sec={sec} key={sec.id} />
                  ))}
                </div>
              </div>
              <div className="my-6">
                <h4 className=" text-primary font-semibold text-[22px] py-2">
                  Requirements
                </h4>
                <div className=" flex flex-col gap-1">
                  {data?.payload.course.prerequisites &&
                    data?.payload.course.prerequisites.map((p) => (
                      <p className=" flex items-center leading-[14px] gap-1 text-[14px] font-medium">
                        <span className=" text-primary text-[14px]">
                          <VscDebugBreakpointLog />
                        </span>{" "}
                        {p}
                      </p>
                    ))}
                </div>
              </div>
              <div className=" py-6">
                <h2 className=" font-semibold text-[22px] text-text">
                  Instructor
                </h2>
                <div className=" mt-[-5px]">
                  {data?.payload.course.teachers.map((t) => (
                    <div>
                      <h3 className=" capitalize text-[18px] font-bold text-primary">
                        {t.fullname}
                      </h3>
                      <div className=" flex items-center gap-3">
                        <div>
                          <img
                            src={t.avatarUrl}
                            alt=""
                            className=" w-[100px] rounded-full"
                          />
                        </div>
                        <div className=" flex flex-col gap-1">
                          <p className=" flex gap-1 items-center">
                            <span className=" text-primary text-[12px] ">
                              <MdOutlineRateReview />
                            </span>
                            <span className=" text-[14px] font-medium text-text">
                              {t.totalReviews} Reviews
                            </span>
                          </p>
                          <p className=" flex gap-1 items-center">
                            <span className=" text-primary text-[12px] ">
                              <BsFillPeopleFill />{" "}
                            </span>
                            <span className=" text-[14px] font-medium text-text">
                              {t.totalStudentsEnrolled} Students
                            </span>
                          </p>
                          <p className=" flex gap-1 items-center">
                            <span className=" text-primary text-[12px] ">
                              <MdSlowMotionVideo />{" "}
                            </span>
                            <span className=" text-[14px] font-medium text-text">
                              {t.numOfTeachingCourses} Courses
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className=" capitalize font-medium mt-3">
                        {t.bio ? t.bio : "no bio"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              ref={devRef}
              className={`lg:basis-[26%] h-fit lg:bg-[#f4f4f4] lg:border-[1px] border-[#efefef] lg:shadow-lg`}
            >
              {" "}
              <div className=" mb-3 flex lg:hidden items-center gap-1">
                <span className=" font-bold text-[18px] sm:text-[22px] text-primary">
                  {data?.payload.course.category.categoryName}
                </span>
                <span className=" text-[18px] text-text">
                  <MdKeyboardArrowRight />
                </span>
                <span className=" text-[14px]  sm:text-[18px] text-accent-1 font-medium">
                  {" "}
                  {data?.payload.course.title}
                </span>
              </div>
              <div
                className={` transition-opacity duration-500 ${
                  isVisible ? "opacity-100 h-auto" : "lg:opacity-0 "
                }  lg:w-full flex items-center justify-center`}
              >
                <img
                  src={data?.payload.course.thumbnailUrl}
                  alt=""
                  className=" w-[60%] lg:w-full"
                />
              </div>
              <h1 className=" block lg:hidden font-bold text-[28px] text-text mt-[-10px]">
                {data?.payload.course.title}{" "}
                {`${
                  data?.payload.course.subtitle
                    ? ` - ${data?.payload.course.subtitle}`
                    : ""
                }`}
              </h1>
              <p
                className={` block lg:hidden capitalize text-[16px] leading-[18px] text-[#4d4d4d] font-medium mt-[-5px]`}
              >
                {data?.payload.course.desc}
              </p>
              <p className=" flex lg:hidden pt-2 items-center gap-1">
                <p>
                  <span>{data?.payload.course.numOfEnrolledStudents}</span>{" "}
                  students
                </p>
                <p className=" flex items-center gap-1">
                  <span>({value ? value : 0})</span>
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    size="small"
                  />
                  <span>
                    ({data?.payload.course.numOfCourseReviews} ratings)
                  </span>
                </p>
              </p>{" "}
              <h3 className=" text-primary font-medium flex lg:hidden items-center gap-1">
                Created by{" "}
                <p className=" text-text font-semibold text-[20px]">
                  {" "}
                  {data?.payload.course.teachers
                    .map((t) => t.fullname)
                    .join(" - ")}
                </p>
              </h3>
              <div className=" flex flex-col lg:hidden  pt-1 gap-1">
                <div className=" flex items-center gap-1">
                  <span className=" text-[22px] text-primary">
                    <MdBrowserUpdated />
                  </span>
                  <span className=" text-[12px] text-text font-semibold">
                    Last updated{" "}
                    <span className=" text-[14px] font-medium">
                      {" "}
                      {formatDate(data?.payload.course.updatedAt ?? "")}
                    </span>
                  </span>
                </div>
                <div className=" flex items-center gap-1">
                  <span className=" text-[18px] text-primary">
                    <MdLanguage />
                  </span>
                  <span className=" text-[14px] font-medium">
                    {data?.payload.course.lang == "ar" ? "Arabic" : "English"}
                  </span>
                </div>
                <div className=" flex items-center gap-1">
                  <span className=" text-[18px] text-primary">
                    <AiFillFire />
                  </span>
                  <span className=" text-[14px] font-medium">
                    {data?.payload.course.level}
                  </span>
                </div>
              </div>
              <div
                className={` ${
                  !isVisible &&
                  `lg:fixed lg:top-0 lg:w-[25%] xl:w-[22%] lg:bg-[#f4f4f4] lg:border-[1px] lg:border-[#efefef] lg:shadow-lg`
                } px-4 py-4`}
              >
                <h2 className=" text-[30px] font-semibold text-text">
                  {data?.payload.course.price
                    ? `${data?.payload.course.price} $`
                    : `Free`}{" "}
                </h2>
                <div className=" my-2">
                  <div className=" flex justify-between items-center">
                    <button className="py-2 h-[40px] bg-primary text-white font-medium w-[85%]">
                      Add to cart
                    </button>
                    <span className=" cursor-pointer text-primary text-[24px] w-[14%] border-2 border-[#0000001b] h-[40px] flex items-center justify-center">
                      <GrFavorite />
                    </span>
                  </div>
                  <button className=" flex items-center justify-center w-full mt-2 border-2 py-2 font-medium text-[18px] text-text h-[45px]">
                    Buy now
                  </button>
                </div>{" "}
                <div className="border-2 py-6 px-4 my-8 block lg:hidden">
                  <h3 className=" text-[20px] font-semibold text-text">
                    What you'll learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-5 ">
                    {data?.payload.course.outline &&
                      data?.payload.course.outline.map((O) => (
                        <p className=" flex items-start leading-[14px] gap-1 text-[14px]">
                          <span className=" text-primary text-[14px]">
                            <IoMdStar />
                          </span>{" "}
                          {O}
                        </p>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className=" text-[18px] font-medium text-text">
                    This course includes:
                  </h4>
                  <ul>
                    <li className=" flex items-center gap-2 text-[15px]">
                      {" "}
                      <span className=" text-primary text-[14px]">
                        <PiVideoBold />
                      </span>{" "}
                      {data?.payload.course.totalLength
                        ? (data?.payload.course.totalLength / 3600).toFixed(2)
                        : 0}{" "}
                      hours on-demand video
                    </li>
                    <li className=" flex items-center gap-2 text-[15px]">
                      {" "}
                      <span className=" text-primary text-[14px]">
                        <FaMobileAlt />{" "}
                      </span>{" "}
                      Access on mobile and TV
                    </li>
                    <li className=" flex items-center gap-2 text-[15px]">
                      {" "}
                      <span className=" text-primary text-[14px]">
                        <IoInfinite />{" "}
                      </span>{" "}
                      Full lifetime access
                    </li>
                    <li className=" flex items-center gap-2 text-[15px]">
                      {" "}
                      <span className=" text-primary text-[14px]">
                        <TbCertificate />{" "}
                      </span>{" "}
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-[85%] mx-auto flex flex-col sm:flex-row items-center md:items-left justify-center border-2 shadow-md p-4 mb-6">
            <div className=" max-w-[250px] sm:min-w-[250px]">
              <img src={img1} alt="" className=" w-full" />
            </div>
            <div className=" flex text-center  md:text-left flex-col items-center md:items-start  justify-between w-[100%] ">
              <h1 className=" font-bold text-[26px] text-accent-1">
                Take the leap, enroll today!{" "}
              </h1>
              <p className=" text-[#696868] w-[95%] sm:w-[80%]">
                Discover the endless possibilities that await you and embark on
                a transformative journey of self-improvement today by investing
                in this exceptional course.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseById;
