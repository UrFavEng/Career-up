import { GoFile } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDeleteSecMutation, useEditNewSecMutation } from "../store/apislice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface SectionCourseProps {
  SectionData: {
    id: number;
    title: string;
    order: number;
    courseId: number;
    totalLength: null | number;
    numOfVideos: string;
    videos: any[];
  };
}
interface FormValues {
  sectionTitle: string;
}
const SectionCourse = ({ SectionData }: SectionCourseProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [showAddVideo, setShowAddVideo] = useState<boolean>(false);
  const { id } = useParams<{ id: string | undefined }>();
  const NumID = Number(id);
  const [deleteSec] = useDeleteSecMutation();
  const handleDeleteSec = () => {
    const dataDelete = {
      courseId: NumID,
      id: SectionData.id,
    };
    deleteSec(dataDelete)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  const { handleSubmit, setValue, register } = useForm<FormValues>();
  useEffect(() => {
    setValue("sectionTitle", SectionData.title);
  }, []);

  const [editNewSec] = useEditNewSecMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const body = { courseId: NumID, sectionTitle: data.sectionTitle };
    editNewSec({ body, id: SectionData.id })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setShow(false);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  return (
    <div className=" cursor-move  border-2 py-5 px-2 bg-background div-esc">
      <div className=" flex items-center gap-2">
        Unpublished Section:{" "}
        <span>
          <GoFile />
        </span>
        {show ? (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("sectionTitle")}
              className=" w-[250px] h-[30px] placeholder:text-[14px] placeholder:font-semibold"
              type="text"
              placeholder="Enter a Title"
            />{" "}
            <input
              type="submit"
              value="Edit"
              className=" w-[50px] bg-primary h-[30px] font-semibold text-text cursor-pointer"
            />
          </form>
        ) : (
          <span>{SectionData.title}</span>
        )}
        <span
          onClick={() => setShow(!show)}
          className=" icn-sec cursor-pointer"
        >
          <MdEdit />
        </span>
        <span
          className=" icn-sec cursor-pointer"
          onClick={() => handleDeleteSec()}
        >
          <MdDelete />
        </span>
      </div>
      <h1
        onClick={() => setShowAddVideo(!showAddVideo)}
        className=" cursor-pointer w-fit font-medium text-accent-1 hover:text-black py-[6px] px-2 bg-secondary"
      >
        Upload Lecture
      </h1>
      {showAddVideo ? (
        <form action="" className=" mt-2" onSubmit={(e) => e.preventDefault()}>
          <div className=" flex flex-col">
            <label
              htmlFor="title"
              className="cursor-pointer text-[15px] font-semibold text-[#383838]"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="   capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
            />
          </div>
          <div className=" mt-3 mb-4">
            {" "}
            <input
              type="file"
              id="file-inputt"
              className=" outline-none border-none w-0 hidden"
            />
            <label
              id="file-input-label"
              htmlFor="file-inputt"
              className="cursor-pointer w-fit font-medium text-accent-1 hover:text-black py-2 px-2 bg-secondary"
            >
              Upload Video
            </label>
          </div>
          <div className=" flex gap-2 items-center">
            <select
              title="status "
              className=" h-[32px] cursor-pointer pl-2 sm:w-[30%] font-medium text-[18px] shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
            <input
              type="submit"
              value="Submit"
              className=" w-fit h-[32px]  px-4 py-1  bg-primary font-medium text-text cursor-pointer"
            />
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default SectionCourse;
