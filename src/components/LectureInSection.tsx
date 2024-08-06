import { MdDelete, MdEdit } from "react-icons/md";
import UpdateVideo from "./UpdateVideo";
import { Hourglass } from "react-loader-spinner";
import { MutableRefObject, useState } from "react";
import { useDeleteVideoMutation } from "../store/apislice";
import Swal from "sweetalert2";
interface LectureInSectionProps {
  index: number;
  v: {
    title: string;
    id: number;
    length: number;
    order: number;
    public: boolean;
    sectionId: number;
  };
  SectionData: {
    id: number;
    title: string;
    order: number;
    courseId: number;
    totalLength: null | number;
    numOfVideos: string;
    videos: {
      title: string;
      id: number;
      length: number;
      order: number;
      public: boolean;
      sectionId: number;
    }[];
  };
  handleSortVideo: () => void;
  setDragVideoId: (val: number) => void;
  targetSectionId: MutableRefObject<number>;
  dragVideo: MutableRefObject<number>;
  draggedOverVideo: MutableRefObject<number>;
  currentSectionId: MutableRefObject<number>;
}
const LectureInSection = ({
  v,
  SectionData,
  handleSortVideo,
  setDragVideoId,
  // targetSectionId,
  dragVideo,
  draggedOverVideo,
  currentSectionId,
  index,
}: LectureInSectionProps) => {
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
  const [deleteVid, { isLoading: loadingDeleteVid }] = useDeleteVideoMutation();

  const handleDeleteVid = (id: number) => {
    const body = { courseId: SectionData.courseId, sectionId: SectionData.id };
    console.log(body);
    deleteVid({ body, id })
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };
  const [showAdd, setShowAdd] = useState<boolean>(false);

  return (
    <div className="bg-secondary border-2">
      {" "}
      <div
        draggable
        onDragLeave={() => {
          if (dragOverIndex === index) {
            setDragOverIndex(null);
          }
        }}
        onDragStart={() => {
          dragVideo.current = v.order;
          console.log(v.order);

          currentSectionId.current = SectionData.id;
          setDragVideoId(v.id);
        }}
        onDragEnter={() => {
          draggedOverVideo.current = v.order;
          console.log(v.order);
          // targetSectionId.current = SectionData.id;

          setDragOverIndex(index);
        }}
        onDragEnd={() => {
          handleSortVideo();
          setDragOverIndex(null); // إعادة تعيين حالة dragOverIndex إلى null عند انتهاء السحب والإفلات
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        className="  cursor-grab relative z-40 div-vid  py-2 flex items-center "
      >
        {dragOverIndex === index && (
          <div className="w-full top-0 absolute flex items-center h-[2px] bg-[#115169]"></div>
        )}
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
    </div>
  );
};

export default LectureInSection;
