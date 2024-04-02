import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdataVidMutation } from "../store/apislice";
import { useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";

interface SectionGetCourseVideo {
  title: string;
  id: number;
  length: number;
  order: number;
  public: boolean;
  sectionId: number;
}
interface UpdateVideoProps {
  visible: boolean;
  DataVideo: SectionGetCourseVideo;
  CourseId: number;
}
interface FormValues {
  title: string;
  public: boolean;
}
const UpdateVideo = ({ visible, DataVideo, CourseId }: UpdateVideoProps) => {
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const { handleSubmit, setValue, register } = useForm<FormValues>();
  const [updataVid, { isLoading: loadingUpdataVid }] = useUpdataVidMutation();
  useEffect(() => {
    setValue("title", DataVideo.title);
    setValue("public", DataVideo.public);
  }, []);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const body = { title: data.title, public: data.public, courseId: CourseId };
    updataVid({ body, id: DataVideo.id })
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  if (!visible) return null;
  return (
    <div className=" cursor-default">
      <div className="px-2 pb-4">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col mb-2">
            <label
              htmlFor="title"
              className="cursor-pointer text-[18px] font-semibold text-[#383838]"
            >
              Title
            </label>{" "}
            <input
              {...register("title")}
              type="text"
              id="title"
              placeholder="Title"
              className=" w-[255px] h-[30px]   capitalize text-[16px] font-medium  pl-2 border-[#777] border-[1px] py-1 outline-none rounded-md"
            />
          </div>
          <div className=" mb-2 flex items-center gap-3">
            <select
              {...register("public")}
              title="status "
              className=" w-[105px] h-[30px]  cursor-pointer pl-2  font-medium  border-[#777] border-[1px] py-1 outline-none rounded-md"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
            {loadingUpdataVid ? (
              <div className="">
                {" "}
                <Hourglass
                  visible={true}
                  height="20"
                  width="20"
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
                className={`w-fit h-[30px]  px-2   bg-primary font-medium text-[15px] flex items-center justify-center text-text cursor-pointer`}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVideo;
