import { GoFile } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiMiniBars2 } from "react-icons/hi2";
import {
  useDeleteSecMutation,
  // useDeleteVideoMutation,
  useEditNewSecMutation,
} from "../store/apislice";
import { useParams } from "react-router-dom";
import { MutableRefObject, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UploadVideo from "./UploadVideo";
// import UpdateVideo from "./UpdateVideo";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
import LectureInSection from "./LectureInSection";
interface SectionGetCourseVideo {
  title: string;
  id: number;
  length: number;
  order: number;
  public: boolean;
  sectionId: number;
  // Add other properties as needed
}
interface SectionCourseProps {
  SectionData: {
    id: number;
    title: string;
    order: number;
    courseId: number;
    totalLength: null | number;
    numOfVideos: string;
    videos: SectionGetCourseVideo[];
  };
  dragPerson: MutableRefObject<number>;
  targetSectionId: MutableRefObject<number>;
  dragVideo: MutableRefObject<number>;
  draggedOverVideo: MutableRefObject<number>;
  currentSectionId: MutableRefObject<number>;
  draggedOverPerson: MutableRefObject<number>;
  setDragPersonId: (val: number) => void;
  setDragVideoId: (val: number) => void;
  handleSort: () => void;
  handleSortVideo: () => void;
  index: number;
}
interface FormValues {
  sectionTitle: string;
}
const SectionCourse = ({
  SectionData,
  draggedOverPerson,
  dragPerson,
  setDragPersonId,
  index,
  handleSort,
  handleSortVideo,
  setDragVideoId,
  targetSectionId,
  dragVideo,
  draggedOverVideo,
  currentSectionId,
}: SectionCourseProps) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const [show, setShow] = useState<boolean>(false);
  const [showAddVideo, setShowAddVideo] = useState<boolean>(false);
  const { id } = useParams<{ id: string | undefined }>();
  const NumID = Number(id);
  const [deleteSec, { isLoading: loadingDeleteSec }] = useDeleteSecMutation();
  // const [deleteVid, { isLoading: loadingDeleteVid }] = useDeleteVideoMutation();
  const handleDeleteSec = () => {
    const dataDelete = {
      courseId: NumID,
      id: SectionData.id,
    };
    deleteSec(dataDelete)
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  // const handleDeleteVid = (id: number) => {
  //   const body = { courseId: SectionData.courseId, sectionId: SectionData.id };
  //   console.log(body);
  //   deleteVid({ body, id })
  //     .unwrap()
  //     .then((fulfilled) => {
  //       handleSuccess();
  //       console.log(fulfilled);
  //     })
  //     .catch((rejected) => {
  //       console.error(rejected);
  //     });
  // };
  const { handleSubmit, setValue, register } = useForm<FormValues>();
  useEffect(() => {
    setValue("sectionTitle", SectionData.title);
  }, [SectionData]);

  const [editNewSec, { isLoading: loadingEditSec }] = useEditNewSecMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const body = { courseId: NumID, sectionTitle: data.sectionTitle };
    editNewSec({ body, id: SectionData.id })
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        console.log(fulfilled);
        setShow(false);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  // const [showAdd, setShowAdd] = useState<boolean>(false);
  return (
    <div
      onDragEnter={() => {
        targetSectionId.current = SectionData.id;
      }}
      onDragEnd={() => {
        // handleSortVideo();
        setDragOverIndex(null); // إعادة تعيين حالة dragOverIndex إلى null عند انتهاء السحب والإفلات
      }}
      className=" border-2 relative py-5 bg-background div-esc"
    >
      {dragOverIndex === index && (
        <div className="w-full top-0 absolute flex items-center h-[2px] bg-[#115169]"></div>
      )}
      <div className="px-2 flex items-center gap-2">
        <span
          draggable
          onDragLeave={() => {
            if (dragOverIndex === index) {
              setDragOverIndex(null);
            }
          }}
          onDragStart={() => {
            dragPerson.current = SectionData.order;
            setDragPersonId(SectionData.id);
          }}
          onDragEnter={() => {
            draggedOverPerson.current = SectionData.order;
            setDragOverIndex(index);
          }}
          onDragEnd={() => {
            handleSort();
            setDragOverIndex(null); // إعادة تعيين حالة dragOverIndex إلى null عند انتهاء السحب والإفلات
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          className=" text-primary text-[24px]  mr-[-5px] cursor-grab"
        >
          <HiMiniBars2 />
        </span>{" "}
        Unpublished Section:{" "}
        <span>
          <GoFile />
        </span>
        {show ? (
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className=" flex items-center gap-2"
          >
            <input
              {...register("sectionTitle")}
              className=" w-[250px] h-[30px] placeholder:text-[14px] placeholder:font-semibold"
              type="text"
              placeholder="Enter a Title"
            />{" "}
            {loadingEditSec ? (
              <div className=" inline-block">
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
                value="Edit"
                className=" w-[50px] bg-primary h-[30px] font-semibold text-text cursor-pointer"
              />
            )}
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
        {loadingDeleteSec ? (
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
          <span
            className=" icn-sec cursor-pointer"
            onClick={() => handleDeleteSec()}
          >
            <MdDelete />
          </span>
        )}
      </div>
      <div className="px-2 mb-2">
        <h3 className=" text-[22px] pt-1 font-semibold text-accent-1">
          Videos:
        </h3>
        {SectionData.videos.length == 0 && (
          <div
            draggable
            onDragLeave={() => {}}
            onDragStart={() => {}}
            onDragEnter={() => {}}
            onDragEnd={() => {}}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            className="bg-secondary text-text py-[12px] border-2 text-center font-bold text-[18px]"
          >
            Drop here
          </div>
        )}
        {SectionData.videos.map((v, index) => (
          <>
            <LectureInSection
              index={index}
              targetSectionId={targetSectionId}
              dragVideo={dragVideo}
              draggedOverVideo={draggedOverVideo}
              currentSectionId={currentSectionId}
              setDragVideoId={setDragVideoId}
              handleSortVideo={handleSortVideo}
              key={v.id}
              v={v}
              SectionData={SectionData}
            />
            {/* <div className="bg-secondary border-2" key={v.id}>
              {" "}
              <div className="cursor-move div-vid  py-2 flex items-center ">
                <span className=" font-medium text-text text-[17px] px-2">
                  {v.title}
                </span>
                <div className=" flex items-center gap-1">
                  <span
                    className=" cursor-pointer icn-vid"
                    onClick={() => setShowAdd(!showAdd)}
                  >
                    <MdEdit />
                  </span>
                  {loadingDeleteVid ? (
                    <>
                      {" "}
                      <div className="">
                        {" "}
                        <Hourglass
                          visible={true}
                          height="15"
                          width="15"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["#EC5252", "#ec525252"]}
                        />
                      </div>
                    </>
                  ) : (
                    <span
                      className=" cursor-pointer icn-vid"
                      onClick={() => handleDeleteVid(v.id)}
                    >
                      <MdDelete />
                    </span>
                  )}
                </div>
              </div>
              <UpdateVideo
                visible={showAdd}
                DataVideo={v}
                CourseId={SectionData.courseId}
              />
            </div> */}
          </>
        ))}
      </div>
      <h1
        onClick={() => setShowAddVideo(!showAddVideo)}
        className=" cursor-pointer w-fit font-medium text-accent-1 hover:text-black py-[6px] px-2 mx-2 bg-secondary"
      >
        Upload Lecture
      </h1>
      {showAddVideo ? <UploadVideo SectionData={SectionData} /> : ""}
    </div>
  );
};

export default SectionCourse;
