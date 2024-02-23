import { img1 } from "../assests";
import { useParams } from "react-router-dom";

const CoursesByCat = () => {
  const { catname } = useParams<{ catname: string | undefined }>();

  return (
    <div className=" container min-h-[68vh] py-4">
      <h2 className=" font-extrabold text-[28px] leading-3 mt-2  text-primary tracking-[-1px]">
        {catname}
      </h2>
      <h5 className=" text-accent-1 text-[18px] font-medium mt-2">
        Courses to get you started
      </h5>
      <div className=" flex justify-center items-center">
        <div className=" px-8 md:px-2 py-8 md:py-0 w-[95%] lg:w-[80%]  bg-white border-2 shadow-md my-4 flex-col md:flex-row flex justify-center items-center">
          <div className=" max-w-[380px] md:w-[40%] lg:w-[35%]">
            <img src={img1} alt="" className=" object-contain w-full" />
          </div>
          <div className=" md:w-[55%] lg:w-[60%] flex flex-col gap-4">
            <h3 className=" font-bold text-[26px] text-text">
              Unlock Your Potential: Invest in Knowledge Today!
            </h3>
            <p className="  text-accent-1 leading-[18px] w-[95%]">
              Invest in your future and own knowledge! Purchase courses now to
              develop your skills and achieve your personal and professional
              goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesByCat;
