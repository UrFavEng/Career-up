import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadVideoMutation } from "../store/apislice";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
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
interface VideoData {
  title: string;
  public: boolean;
  courseVideo: FileList;
}
const UploadVideo = ({ SectionData }: SectionCourseProps) => {
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const [UploadLecture, { isLoading: loadingUploadVid }] =
    useUploadVideoMutation();
  const { handleSubmit, register } = useForm<VideoData>();
  const onSubmit: SubmitHandler<VideoData> = (data) => {
    const formData = new FormData();
    if (data.courseVideo && data.courseVideo.length > 0) {
      formData.append("courseVideo", data.courseVideo[0]);
    }
    formData.append("title", data.title);
    formData.append("public", data.public.toString());
    formData.append("sectionId", SectionData.id.toString());
    UploadLecture({ body: formData, id: SectionData.courseId })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        handleSuccess();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  return (
    <form action="" className="mx-2 mt-2" onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex flex-col">
        <label
          htmlFor="title"
          className="cursor-pointer text-[15px] font-semibold text-[#383838]"
        >
          Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          id="title"
          placeholder="Title"
          className="   capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
        />
      </div>
      <div className=" mt-3 mb-4">
        {" "}
        <input
          {...register("courseVideo", { required: "Course Video is required" })}
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
          {...register("public", { required: "Title is required" })}
          title="status "
          className=" h-[32px] cursor-pointer pl-2 sm:w-[30%] font-medium text-[18px] shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        {loadingUploadVid ? (
          <div className="">
            {" "}
            <Hourglass
              visible={true}
              height="25"
              width="25"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#EC5252", "#ec525252"]}
            />
          </div>
        ) : (
          <input
            type="submit"
            value="Submit"
            className={`w-fit h-[32px]  px-4 py-1  bg-primary font-medium text-text cursor-pointer`}
          />
        )}
      </div>
    </form>
  );
};

export default UploadVideo;
