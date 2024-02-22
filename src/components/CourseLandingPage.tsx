import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useEditCourseDataMutation,
  // useEditCourseDataMutation,
  useGetAllCatsQuery,
  useGetCourseByidQuery,
} from "../store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
type FormValues = {
  title: string;
  subtitle: string | null;
  desc: string | null;
  level: string;
  lang: string;
  price: null | number;
  categoryId: number;
  prerequisites: string[];
  outline: string[];
  thumbnail: FileList;
  previewVideo: FileList;
};
const CourseLandingPage = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const { data, isLoading: getCourseLoading } = useGetCourseByidQuery(id);
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    // formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { prerequisites: [""], outline: [""] },
  });

  const prerequisites = watch("prerequisites", []);
  const outline = watch("outline", []);

  useEffect(() => {
    if (data) {
      setValue("title", data.payload.course.title);
      setValue("subtitle", data.payload.course.subtitle);
      setValue("desc", data.payload.course.desc);
      setValue("level", data.payload.course.level);
      setValue("lang", data.payload.course.lang);
      setValue("categoryId", data.payload.course.categoryId);
      setValue("price", data.payload.course.price);
      if (data.payload.course.prerequisites) {
        for (let i = 0; i < data.payload.course.prerequisites.length; i++)
          setValue(`prerequisites.${i}`, data.payload.course.prerequisites[i]);
      }
      if (data.payload.course.outline) {
        for (let i = 0; i < data.payload.course.outline.length; i++)
          setValue(`outline.${i}`, data.payload.course.outline[i]);
      }
      // setValue("prerequisites", data.payload.course.prerequisites);
    }
  }, [data]);
  const { data: allCats } = useGetAllCatsQuery();
  const addPrerequisite = () => {
    setValue("prerequisites", [...prerequisites, ""]);
  };
  const addOutline = () => {
    setValue("outline", [...outline, ""]);
  };

  const removePrerequisite = (index: number) => {
    if (prerequisites.length === 1) return;
    const updatedPrerequisites = [
      ...prerequisites.slice(0, index),
      ...prerequisites.slice(index + 1),
    ];
    setValue("prerequisites", updatedPrerequisites);
  };
  const removeOutline = (index: number) => {
    if (outline.length === 1) return;
    const updatedOutline = [
      ...outline.slice(0, index),
      ...outline.slice(index + 1),
    ];
    setValue("outline", updatedOutline);
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
  const handleErr = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  };
  const [editCourseData, { isLoading: editCourseLoading }] =
    useEditCourseDataMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.previewVideo && data.previewVideo.length > 0) {
      formData.append("previewVideo", data.previewVideo[0]);
    }
    console.log(data.prerequisites);
    formData.append("title", data.title);
    formData.append("desc", data.desc as string);
    if (data.price) {
      formData.append("price", data.price.toString());
    }
    formData.append("subtitle", data.subtitle as string);
    formData.append("lang", data.lang as string);
    formData.append("level", data.level as string);
    formData.append("categoryId", String(data.categoryId));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    formData.append("prerequisites[]", data.prerequisites);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    formData.append("outline[]", data.outline);

    const entriesArray = Array.from(formData.entries());
    console.log(entriesArray);
    if (entriesArray.length !== 0) {
      editCourseData({ formData, id })
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
          handleSuccess();
        })
        .catch((rejected) => {
          handleErr();
          console.log(rejected);
        });
    }
  };
  return (
    <div className=" container rounded-md border-2 shadow-2xl my-4 bg-white shadow-[#b3b3b3]">
      <div className="py-4 border-b-2">
        <h1 className=" mb-2 font-extrabold text-[28px] text-accent-1 ">
          Course Landing Page
        </h1>
        <p className=" text-[#777] md:w-[85%] font-medium">
          Your course landing page is crucial to your success on Udemy. If it’s
          done right, it can also help you gain visibility in search engines
          like Google. As you complete this section, think about creating a
          compelling Course Landing Page that demonstrates why someone would
          want to enroll in your course
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className=" py-4 flex-col gap-3 flex"
      >
        {getCourseLoading ? (
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
            <div className=" flex flex-col">
              <label
                htmlFor="title"
                className="cursor-pointer text-[20px] font-semibold text-[#383838]"
              >
                Title
              </label>

              <input
                type="text"
                id="title"
                placeholder="Insert your course title"
                {...register("title", { required: "Title is required" })}
                className=" focus:shadow-primary focus:border-primary capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
              />
            </div>
            <div className=" flex flex-col">
              <label
                htmlFor="subtitle"
                className="cursor-pointer text-[20px] font-semibold text-[#383838]"
              >
                Subtitle
              </label>
              <input
                {...register("subtitle")}
                type="text"
                id="subtitle"
                placeholder="Insert your course subtitle"
                className=" focus:shadow-primary focus:border-primary capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
              />
            </div>
            <div className=" flex flex-col">
              <label
                htmlFor="description"
                className=" cursor-pointer text-[20px] font-semibold text-[#383838]"
              >
                Course description
              </label>
              <textarea
                {...register("desc")}
                id="description"
                placeholder="Insert your course description"
                className=" focus:shadow-primary focus:border-primary capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
              />
            </div>
            <div>
              <h3 className=" text-[20px] font-semibold text-[#383838]">
                Basic info
              </h3>
              <div className=" flex justify-between  flex-col sm:flex-row gap-4 sm:gap-0">
                <select
                  {...register("lang")}
                  title="Language"
                  className=" pl-2 sm:w-[30%] font-medium text-[18px] shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
                >
                  <option value="ar">Arabic</option>
                  <option value="en">English</option>
                </select>
                <select
                  {...register("level")}
                  title="Level"
                  className=" pl-2 sm:w-[30%] font-medium text-[18px] shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="advanced">Advanced</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="all levels">All Levels</option>
                </select>
                <select
                  {...register("categoryId")}
                  title="Category"
                  className=" pl-2 sm:w-[30%] font-medium text-[18px] shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
                >
                  {allCats?.payload.categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="  flex justify-between  gap-3 md:gap-0 flex-col md:flex-row">
              <div className=" flex flex-col md:w-[30%]">
                {" "}
                <label
                  htmlFor="price"
                  className="cursor-pointer text-[20px] font-semibold text-[#383838]"
                >
                  Price
                </label>
                <input
                  {...register("price")}
                  type="text"
                  id="price"
                  placeholder="Insert your course price"
                  className=" focus:shadow-primary focus:border-primary capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
                />
              </div>
              <div className=" flex flex-col md:w-[65%]">
                <label
                  htmlFor=""
                  className=" text-[20px] font-semibold text-[#383838]"
                >
                  List of required qualifications
                </label>
                <div className="flex flex-col gap-1">
                  {prerequisites.map((prerequisite, index) => (
                    <div
                      className="flex justify-between items-center"
                      key={index}
                    >
                      <input
                        className="focus:shadow-primary w-[78%] sm:w-[85%] lg:w-[90%] focus:border-primary capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
                        {...register(`prerequisites.${index}` as const)}
                        defaultValue={prerequisite}
                      />
                      {prerequisites.length > 1 && (
                        <button
                          className="text-primary font-semibold text-[18px]"
                          type="button"
                          onClick={() => removePrerequisite(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-[18px] w-fit font-semibold text-accent-1 hover:text-black mt-2 py-1 px-2 bg-secondary rounded-md"
                    onClick={addPrerequisite}
                  >
                    Add Prerequisite
                  </button>
                </div>
              </div>
            </div>
            <div className=" flex flex-col">
              <label
                htmlFor=""
                className=" text-[20px] font-semibold text-[#383838]"
              >
                What will students learn in your course?
              </label>
              <div className="flex flex-col gap-1">
                {outline.map((element, index) => (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <input
                      className="focus:shadow-primary w-[78%] sm:w-[90%] lg:w-[93.5%] focus:border-primary capitalize text-[17px] font-medium  pl-3 shadow-sm border-[#777] border-[1px] py-1 outline-none rounded-md"
                      {...register(`outline.${index}` as const)}
                      defaultValue={element}
                    />
                    {outline.length > 1 && (
                      <button
                        className="text-primary font-semibold text-[18px]"
                        type="button"
                        onClick={() => removeOutline(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="text-[18px] w-fit font-semibold text-accent-1 hover:text-black mt-2 py-1 px-2 bg-secondary rounded-md"
                  onClick={addOutline}
                >
                  Add Prerequisite
                </button>
              </div>
            </div>
            <div className="flex items-center sm:items-start justify-center flex-col md:flex-row gap-8 md:gap-3 w-fit">
              <div className=" items-center sm:items-start flex flex-col-reverse sm:flex-row-reverse md:flex-col-reverse lg:flex-row-reverse gap-4 md:w-[40%] lg:w-[45%]">
                <div className=" text-center sm:text-left">
                  <input
                    {...register("thumbnail")}
                    type="file"
                    id="file-inputt"
                    className=" outline-none border-none w-0 hidden"
                    accept="image/*"
                  />
                  <h4 className=" mb-4 text-center sm:text-left font-semibold text-[15px] leading-[17px]">
                    Upload your course image here. It must meet our course image
                  </h4>
                  <label
                    id="file-input-label"
                    htmlFor="file-inputt"
                    className="text-[20px] cursor-pointer w-fit font-bold text-accent-1 hover:text-black py-3 px-3 bg-secondary"
                  >
                    Upload File
                  </label>
                </div>
                <img
                  src={
                    watch("thumbnail")?.[0]
                      ? URL.createObjectURL(watch("thumbnail")?.[0])
                      : data?.payload.course.thumbnailUrl
                  }
                  alt=""
                  className=" object-contain w-[250px]"
                />
              </div>
              <div className=" items-center sm:items-start flex flex-col-reverse sm:flex-row-reverse md:flex-col-reverse lg:flex-row-reverse gap-4 md:w-[60%] lg:w-[55%]">
                <div className=" text-center sm:text-left">
                  <input
                    {...register("previewVideo")}
                    type="file"
                    id="file-input"
                    className="outline-none border-none w-0 hidden"
                    accept="video/*"
                  />
                  <h4 className="text-center sm:text-left mb-4 font-semibold text-[15px] leading-[17px]">
                    Your promo video is a quick and compelling way for students
                    to preview what they’ll learn in your course. Students
                    considering your course are more likely to enroll if your
                    promo video is well-made
                  </h4>
                  <label
                    id="file-input-label"
                    htmlFor="file-input"
                    className="text-[20px] cursor-pointer w-fit font-bold text-accent-1 hover:text-black py-3 px-3 bg-secondary"
                  >
                    Upload File
                  </label>
                </div>
                <video width="250" height="280" controls>
                  <source
                    src={
                      watch("previewVideo")?.[0]
                        ? URL.createObjectURL(watch("previewVideo")?.[0])
                        : data?.payload.course.thumbnailUrl
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div>
              {editCourseLoading ? (
                <div className=" pl-2 py-4">
                  {" "}
                  <Hourglass
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#EC5252", "#ec525252"]}
                  />
                </div>
              ) : (
                <input
                  type="submit"
                  value="Save"
                  className="  outline-none text-[22px] mt-4 font-bold  text-[#454545] hover:text-[#000] rounded-md cursor-pointer bg-primary py-2 px-6"
                />
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CourseLandingPage;
