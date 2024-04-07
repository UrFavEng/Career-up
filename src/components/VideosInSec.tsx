import { MdOndemandVideo } from "react-icons/md";
import { CourseByIdPublicSectionVideo } from "../types/types.model";
interface VideoInSecProps {
  vid: CourseByIdPublicSectionVideo;
}
const VideosInSec = ({ vid }: VideoInSecProps) => {
  console.log(vid);
  return (
    <div className="bg-[#ededed] flex items-center justify-between px-4 py-3">
      <div className=" flex items-center gap-1">
        {" "}
        <span className=" text-primary">
          {" "}
          <MdOndemandVideo />
        </span>
        <span className=" text-accent-1 font-medium text-[16px] underline-offset-1 underline cursor-pointer ">
          {vid.title}
        </span>
      </div>
      <div className=" flex items-center gap-3">
        <span className=" text-[#434343]  font-medium text-[14px] underline-offset-1 underline cursor-pointer">
          Preview
        </span>
        <span className=" text-[#434343] font-medium text-[12px]">
          {(vid.length / 60).toFixed(1)} m
        </span>
      </div>
    </div>
  );
};

export default VideosInSec;
