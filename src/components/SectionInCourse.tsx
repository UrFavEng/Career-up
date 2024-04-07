import { IoIosArrowDown } from "react-icons/io";
import VideosInSec from "./VideosInSec";
import { useState } from "react";
import { getCourseByIdPublicSection } from "../types/types.model";
interface SecInCourseProps {
  sec: getCourseByIdPublicSection;
}
const SectionInCourse = ({ sec }: SecInCourseProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div key={sec.id} className="border-[#bcbcbc] border-b-2">
      <div
        onClick={() => setShow(!show)}
        className=" flex items-center justify-between px-4  py-3 cursor-pointer"
      >
        <div className=" flex items-center gap-2">
          <span className=" text-primary">
            <IoIosArrowDown />
          </span>
          <span className=" capitalize text-text font-medium text-[18px]">
            {sec.title}
          </span>
        </div>
        <div>
          <p className=" text-[#575757]">
            {sec.numOfVideos} lectures -{" "}
            {sec.totalLength ? (sec.totalLength / 60).toFixed(1) : 0} m
          </p>
        </div>
      </div>
      {show && (
        <div>
          {sec.videos.map((vid) => (
            <VideosInSec key={vid.id} vid={vid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionInCourse;
