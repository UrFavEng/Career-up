import { testVid } from "../assests";
import { CourseByIdPublicSectionVideo } from "../types/types.model";
import { IoClose } from "react-icons/io5";
type ChildProps = {
  setShow: (newValue: boolean) => void;
  vid: CourseByIdPublicSectionVideo;
};

const ShowVideo = ({ setShow, vid }: ChildProps) => {
  console.log(vid);
  const closePopup = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="fixed top-0 z-50  left-0 w-full h-full flex justify-center items-center ">
        <div
          onClick={() => (setShow(false), closePopup())}
          className="bg-gray-500 bg-opacity-50 absolute w-full h-full -z-10"
        ></div>
        <div className="bg-white rounded-md relative p-8 max-w-md overflow-y-auto max-h-[90vh] min-w-[95vh]">
          <span
            onClick={() => (setShow(false), closePopup())}
            className=" cursor-pointer absolute top-4 text-primary text-[20px] right-4"
          >
            <IoClose />
          </span>
          <h2 className=" font-semibold text-[30px] text-primary mb-1">
            {vid.title}
          </h2>
          <div className="mb-4">
            <video controls className=" w-full">
              <source src={testVid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVideo;
