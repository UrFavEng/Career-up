import { MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className=" py-[20px] bg-accent-1 text-accent-2 ">
      <p className="pr-[20px] font-medium text-[18px] px-[20px]">
        Explore a wide range of courses on our platform and expand your
        knowledge in various subjects.
      </p>
      <div className="w-full h-[1px] my-[5px] bg-[#777]"></div>
      {/* <div className="px-[20px] py-[15px]">
        <div>
          <h5 className="text-[18px] text-primary font-semibold tracking-[0.5px]">
            Categories
          </h5>
          <ul>
            <li className=" cursor-pointer text-secondary font-medium">Cat1</li>
            <li>Cat2</li>
            <li>Cat3</li>
            <li>Cat4</li>
            <li>Cat5</li>
            <li>Cat6</li>
            <li>Cat7</li>
          </ul>
        </div>
      </div> */}
      <div className="p-[20px] pb-[0px] flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between ">
        <div className="arrow-container relative  w-fit">
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-[30px] leading-[26px]  text-background font-bold cursor-pointer "
          >
            Career up
          </h1>
          <div className=" absolute text-[25px] top-[-40%] right-[10px] text-primary ">
            <MdKeyboardArrowUp />
          </div>
        </div>
        <p>© 2023 Career up, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;
