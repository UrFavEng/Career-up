import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  useAddCourseMutation,
  useGetAllCatsQuery,
  useTeachingCoursesQuery,
} from "../store/apislice";
import { TeachingCourses } from ".";
import { TeachingCourse } from "../types/types.model";
// import { useNavigate } from "react-router-dom";

const CoursesInstructor = () => {
  // const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false); // نوع الحالة هنا هو number
  const [addCourse] = useAddCourseMutation();
  const { data: allCats } = useGetAllCatsQuery();
  const { data: teachingCoursesRes } = useTeachingCoursesQuery();
  const teachingAllCourses = teachingCoursesRes?.payload.teachingCourses;
  console.log(teachingAllCourses);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const sortCourses = (
    courses: TeachingCourse[],
    sortBy: string
  ): TeachingCourse[] => {
    switch (sortBy) {
      case "newest":
        return [...courses].sort(
          (a, b) =>
            Date.parse(b.course.createdAt) - Date.parse(a.course.createdAt)
        );
      case "oldest":
        return [...courses].sort(
          (a, b) =>
            Date.parse(a.course.createdAt) - Date.parse(b.course.createdAt)
        );
      case "alphabetical":
        return [...courses].sort((a, b) =>
          a.course.title.localeCompare(b.course.title)
        );
      default:
        return courses;
    }
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredCourses = teachingCoursesRes?.payload.teachingCourses.filter(
    (course) =>
      course.course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedCourses = sortCourses(filteredCourses || [], sortBy);
  const HandleAddCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetForm = e.target as HTMLFormElement;
    const inputElement = targetForm[0] as HTMLInputElement;
    const inputElement2 = targetForm[1] as HTMLInputElement;
    console.log(inputElement.value);
    const body = {
      title: inputElement.value,
      categoryId: parseInt(inputElement2.value),
    };
    console.log(body);
    addCourse(body)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };
  return (
    <div className=" container">
      <h1 className=" mb-4 font-bold text-[40px] text-primary">Courses</h1>
      <div className=" flex-col sm:flex-row gap-4 sm:gap-0 flex justify-between items-center">
        <div className=" w-full sm:w-auto flex gap-2 sm:gap-4 items-center flex-col sm:flex-row ">
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className=" relative w-full sm:w-auto"
          >
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search your courses"
              className="placeholder:text-[#777777c3] rounded-sm h-[45px] w-[100%] sm:w-[280px] py-2 px-3 border-[1px] border-[#bcbcbc] focus:outline-none"
            />
            <button
              type="submit"
              className="text-primary absolute cursor-pointer top-[50%] translate-y-[-50%] right-4 "
            >
              {" "}
              <FaSearch />{" "}
            </button>
          </form>
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className=" w-full sm:w-auto text-center"
          >
            <select
              value={sortBy}
              onChange={handleSortChange}
              title="Choose"
              className=" h-[45px] w-[80%] sm:w-auto py-2 px-3 font-semibold outline-none border-2"
            >
              <option
                className="capitalize  font-medium hover:bg-transparent"
                value="newest"
              >
                newest
              </option>
              <option
                className="capitalize  font-medium hover:bg-transparent"
                value="oldest"
              >
                oldest{" "}
              </option>
              <option
                className=" capitalize font-medium hover:bg-transparent"
                value="alphabetical"
              >
                alphabetical
              </option>
            </select>
          </form>
        </div>
        <div
          onClick={() => setShow(!show)}
          className=" cursor-pointer text-background py-2 px-2 font-medium text-[17px] bg-[#EC5252] hover:bg-[#e74242]"
        >
          New course
        </div>
      </div>
      <div
        className={`transition-transform duration-500 ${
          show ? "scale-100 block" : "scale-0 hidden"
        } transform origin-top ease-in-out`}
      >
        <form
          onSubmit={(e) => HandleAddCourse(e)}
          action=""
          className=" flex items-center justify-center mt-4 sm:mt-8 gap-1  flex-col sm:flex-row"
        >
          <input
            type="text"
            placeholder="Name"
            className=" border-2 w-[90%] sm:w-[250px] placeholder:text-[#777777c3] h-[40px] outline-none px-2 py-1 text-text font-medium text-[17px]"
          />
          <select
            title="Choose a category"
            className=" w-[85%] sm:w-[180px] h-[40px] px-2 py-1 border-2 font-medium text-[17px] outline-none"
          >
            {allCats?.payload.categories.map((e) => (
              <option key={e.id} value={e.id}>
                {e.categoryName}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Add"
            className=" hover:text-secondary w-[20%] sm:w-auto text-white py-2 px-5 bg-[#EC5252] hover:bg-[#e74242] text-[18px] h-[40px] font-bold "
          />
        </form>
      </div>
      <div className=" flex flex-col gap-3 pb-6 pt-2 sm:pt-6">
        {sortedCourses.map((e) => (
          <div key={e.courseId}>
            {" "}
            <TeachingCourses Courses={e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesInstructor;
