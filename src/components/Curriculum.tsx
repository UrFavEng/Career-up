import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewSecMutation, useGetCourseByidQuery } from "../store/apislice";
import { useParams } from "react-router-dom";
import SectionCourse from "./SectionCourse";
interface dataTS {
  sectionTitle: string;
}
const Curriculum = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data } = useGetCourseByidQuery(id);
  const IDNum = Number(id);
  const [AddNewSec] = useAddNewSecMutation();
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
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  return (
    <div className=" container rounded-md border-2 shadow-2xl my-4 bg-white shadow-[#b3b3b3]">
      <div className="py-4 border-b-2">
        <h1 className=" mb-2 font-extrabold text-[28px] text-accent-1 ">
          Curriculum
        </h1>
        <p className=" text-[#777] md:w-[85%] font-medium">
          Start putting together your course by creating sections, lectures and
          practice (quizzes, coding exercises and assignments). Start putting
          together your course by creating sections, lectures and practice
          activities (quizzes, coding exercises and assignments). Use your
          course outline to structure your content and label your sections and
          lectures clearly. If you’re intending to offer your course for free,
          the total length of video content must be less than 2 hours.
        </p>
      </div>
      <div className=" py-4">
        <div className=" flex gap-4 flex-col">
          {data?.payload.course.sections.map((sec) => (
            <SectionCourse SectionData={sec} key={sec.id} />
          ))}
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
                {...register("sectionTitle", { required: "Title is required" })}
                type="text"
                placeholder="Enter a Title"
                className=" h-[35px] w-[90%]"
              />
            </div>
            <input
              type="submit"
              value="Add Section"
              className=" mt-3  cursor-pointer bg-primary w-fit text-right py-2 px-1 text-text font-semibold text-[17px]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
