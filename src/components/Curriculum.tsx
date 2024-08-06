import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddNewSecMutation,
  useChangeOrderSectionMutation,
  useChangeOrderVideoMutation,
  useGetCourseByidQuery,
} from "../store/apislice";
import { useParams } from "react-router-dom";
import SectionCourse from "./SectionCourse";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
interface dataTS {
  sectionTitle: string;
}
const Curriculum = () => {
  const targetSectionId = useRef<number>(0);
  const currentSectionId = useRef<number>(0);
  const dragVideo = useRef<number>(0);
  const draggedOverVideo = useRef<number>(0);
  const [dragVideoId, setDragVideoId] = useState<number>();
  const { id } = useParams<{ id: string | undefined }>();
  const { data, isLoading, isError, error } = useGetCourseByidQuery(id);
  const [changeOrderSection] = useChangeOrderSectionMutation();
  const [changeOrderVideo, { error: errSortVideo }] =
    useChangeOrderVideoMutation();
  console.log(errSortVideo);
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const [dragPersonId, setDragPersonId] = useState<number>();
  const handleErr = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  };
  const handleErrLogin = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You must log in",
    });
  };
  const handleSortVideo = () => {
    const targetSectionid = targetSectionId.current;
    const currentSectionid = currentSectionId.current;
    const currentOrder = dragVideo.current;
    const newOrder = draggedOverVideo.current;
    const courseId = data?.payload.course.id;
    // Make sure currentOrder and newOrder are different
    // if (currentOrder !== newOrder && courseId && currentOrder && newOrder) {
    const body = {
      targetSectionId: targetSectionid,
      currentSectionId: currentSectionid,
      currentOrder: currentOrder,
      newOrder: newOrder,
      courseId: courseId,
    };
    console.log(body);
    changeOrderVideo({ body, id: dragVideoId })
      .unwrap()
      .then((fulfilled) => {
        // refetch();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        if (rejected.status == 401) {
          handleErrLogin();
        } else {
          handleErr();
        }
      });
    // }
  };
  const handleSort = () => {
    const currentOrder = dragPerson.current;
    const newOrder = draggedOverPerson.current;
    const courseId = data?.payload.course.id;
    // Make sure currentOrder and newOrder are different
    // if (currentOrder !== newOrder && courseId && currentOrder && newOrder) {
    const body = {
      courseId: courseId,
      currentOrder: currentOrder,
      newOrder: newOrder,
    };
    console.log(courseId, currentOrder, newOrder);
    changeOrderSection({ body, id: dragPersonId })
      .unwrap()
      .then((fulfilled) => {
        // refetch();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        if (rejected.status == 401) {
          handleErrLogin();
        } else {
          handleErr();
        }
      });
    // }
  };
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // console.log(data);
  const IDNum = Number(id);
  const [AddNewSec, { isLoading: loadingAddNewSec }] = useAddNewSecMutation();
  const { handleSubmit, register } = useForm<dataTS>();
  const onSubmit: SubmitHandler<dataTS> = (data) => {
    console.log(data);
    const body = {
      sectionTitle: data.sectionTitle,
      courseId: IDNum,
    };
    AddNewSec(body)
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  return (
    <div className=" container rounded-md border-2 shadow-2xl my-4 bg-white shadow-[#b3b3b3]">
      {" "}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}{" "}
      {error?.status == 404 && (
        <p className=" py-[80px] flex justify-center items-center text-primary font-bold text-[28px]">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {error?.data.message}
        </p>
      )}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}{" "}
      {error?.status == 400 && (
        <p className=" py-[80px] flex justify-center items-center text-primary font-bold text-[28px]">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          Invalid id
        </p>
      )}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}{" "}
      {error?.status == 500 && (
        <p className=" pt-40 pb-72 flex justify-center items-center text-primary font-medium text-[18px]">
          Something went wrong on our end. Please try again laters
        </p>
      )}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}{" "}
      {error?.status == 401 && (
        <p className=" pt-40 pb-72 flex justify-center items-center text-primary font-medium text-[18px]">
          You must login first
        </p>
      )}
      {!isError && (
        <>
          {" "}
          <div className="py-4 border-b-2">
            <h1 className=" mb-2 font-extrabold text-[28px] text-accent-1 ">
              Curriculum
            </h1>
            <p className=" text-[#777] md:w-[85%] font-medium">
              Start putting together your course by creating sections, lectures
              and practice (quizzes, coding exercises and assignments). Start
              putting together your course by creating sections, lectures and
              practice activities (quizzes, coding exercises and assignments).
              Use your course outline to structure your content and label your
              sections and lectures clearly. If you’re intending to offer your
              course for free, the total length of video content must be less
              than 2 hours.
            </p>
          </div>
          <div className=" py-4">
            <div className=" flex gap-4 flex-col">
              {isLoading ? (
                <div className=" py-8 flex justify-center items-center">
                  {" "}
                  <Hourglass
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#EC5252", "#ec525252"]}
                  />
                </div>
              ) : (
                <>
                  {" "}
                  {data?.payload.course.sections.map((sec, index) => (
                    <SectionCourse
                      index={index}
                      SectionData={sec}
                      key={sec.id}
                      dragPerson={dragPerson}
                      draggedOverPerson={draggedOverPerson}
                      setDragPersonId={setDragPersonId}
                      handleSort={handleSort}
                      handleSortVideo={handleSortVideo}
                      currentSectionId={currentSectionId}
                      targetSectionId={targetSectionId}
                      draggedOverVideo={draggedOverVideo}
                      dragVideo={dragVideo}
                      setDragVideoId={setDragVideoId}
                    />
                  ))}
                </>
              )}
            </div>
            <div className=" py-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                action=""
                className=" flex  flex-col"
              >
                <div className=" flex items-center justify-between">
                  <span className=" w-[150px] lg:w-[130px] xl:w-[115px] text-text font-semibold text-[20px]">
                    New Section:
                  </span>
                  <input
                    {...register("sectionTitle", {
                      required: "Title is required",
                    })}
                    type="text"
                    placeholder="Enter a Title"
                    className=" h-[35px] w-[90%]"
                  />
                </div>
                {loadingAddNewSec ? (
                  <div className="pt-2">
                    {" "}
                    <Hourglass
                      visible={true}
                      height="35"
                      width="35"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={["#EC5252", "#ec525252"]}
                    />
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Add Section"
                    className=" mt-3  cursor-pointer bg-primary w-fit text-right py-2 px-1 text-text font-semibold text-[17px]"
                  />
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Curriculum;
