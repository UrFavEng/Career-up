interface CourseProps {
  CourseData: {
    id: number;
    thumbnailUrl: string;
    price: null | number;
    title: string;
    teacherNames: string;
  };
}

const Course = ({ CourseData }: CourseProps) => (
  <div className=" bg-transparent ">
    <div className="">
      <img src={CourseData.thumbnailUrl} alt="" />
    </div>
    <div>
      <h4 className=" text-[20px] leading-[20px] mt-[10px] font-bold text-text">
        {CourseData.title}
      </h4>
      <p className=" text-[#6d6d6d] font-medium text-[14px]">
        {CourseData.teacherNames}
      </p>
      <p>{CourseData.price ? CourseData.price : "Free"}</p>
    </div>
  </div>
);

export default Course;
