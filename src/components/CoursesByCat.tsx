import { img1 } from "../assests";
import { useParams } from "react-router-dom";
import Qoute from "./Qoute";
import { SplideSlide, Splide } from "@splidejs/react-splide";
import Course from "./Course";
import { useGetCoursesByCatQuery } from "../store/apislice";
import { useState } from "react";
import CourseInCat from "./CourseInCat";
// import { Pagination } from "flowbite-react";
import { Hourglass } from "react-loader-spinner";
const CoursesByCat = () => {
  interface Quote {
    quote: string;
    author: string;
  }
  const { catname, catid } = useParams<{
    catname: string | undefined;
    catid: string | undefined;
  }>();
  const differentQuotesArray: Quote[] = [
    {
      quote: "Creativity is intelligence having fun.",
      author: "Albert Einstein",
    },
    {
      quote: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
    },
    {
      quote: "In learning, you will teach, and in teaching, you will learn.",
      author: "Phil Collins",
    },
    {
      quote: "Knowledge is the key to unlocking the door to the future.",
      author: "Harry Truman",
    },
    {
      quote: "Every expert was once a beginner.",
      author: "Helen Hayes",
    },
    {
      quote:
        "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      quote: "To learn is to discover how ignorant we are.",
      author: "Immanuel Kant",
    },
    {
      quote:
        "Education breeds confidence. Confidence breeds hope. Hope breeds peace.",
      author: "Confucius",
    },
    {
      quote: "Learning is a treasure that will follow its owner everywhere.",
      author: "Chinese Proverb",
    },
    {
      quote: "Knowledge is the currency of the universe.",
      author: "Scott Adams",
    },
    {
      quote: "Learning is the key to adaptation and survival.",
      author: "Lev S. Vygotsky",
    },
    {
      quote: "Education is the movement from darkness to light.",
      author: "Allan Bloom",
    },
    {
      quote: "The more you learn, the more you earn.",
      author: "Warren Buffett",
    },
    {
      quote:
        "Learning is like rowing upstream; not to advance is to drop back.",
      author: "Chinese Proverb",
    },
    {
      quote: "The best way to predict the future is to create it.",
      author: "Abraham Lincoln",
    },
    {
      quote: "The roots of education are bitter, but the fruit is sweet.",
      author: "Aristotle",
    },
    {
      quote: "Knowledge is the lifeblood of progress.",
      author: "Thomas S. Monson",
    },
    {
      quote:
        "Education is not the filling of a pail, but the lighting of a fire.",
      author: "William Butler Yeats",
    },
    {
      quote:
        "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
    },
    {
      quote: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
    },
  ];
  function getRandomQuotes() {
    const shuffledQuotes = differentQuotesArray.sort(() => 0.5 - Math.random());
    return shuffledQuotes.slice(0, 3);
  }
  const splideOptionsRecoXL = {
    perPage: 5,
    type: "loop",
    focus: 0,
    omitEnd: true,
    gap: 10,
    pagination: false,
    breakpoints: {
      1280: {
        perPage: 4,
      },
      1024: {
        perPage: 3,
      },
      768: {
        perPage: 3,
      },
      640: {
        perPage: 2,
      },
    },
  };
  const randomQuotes = getRandomQuotes();
  const {
    data: getCoursesCats,
    isLoading: getCoursesCatsLoading,
    isFetching,
    isError,
  } = useGetCoursesByCatQuery(catid);

  console.log(getCoursesCats?.payload.courses.length);
  const [mostOrNew, setMostOrNew] = useState<boolean>(true);
  // const [currentPage, setCurrentPage] = useState(1);

  // const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className=" container min-h-[68vh] py-4">
      {isError ? (
        <p className=" pt-40 pb-72 flex justify-center items-center text-primary font-medium text-[18px]">
          Something went wrong on our end. Please try again laters
        </p>
      ) : (
        <>
          {" "}
          <h2 className=" font-extrabold text-[28px] leading-3 mt-2  text-primary tracking-[-1px]">
            {catname}
          </h2>
          <h5 className=" text-accent-1 text-[18px] font-medium mt-2">
            Courses to get you started
          </h5>
          {getCoursesCats?.payload.courses.length == 0 && !isFetching ? (
            <p className="text-[20px] text-center font-bold text-primary pb-[200px] pt-[100px]">
              There are currently no courses available in this category, Be the
              first instructor to contribute by adding your own courses!
            </p>
          ) : (
            <div className="splid-Courses-MainPage pb-10 pt-2">
              <div className=" border-b-2 mb-4 flex items-center ">
                <span
                  className={` ${
                    mostOrNew ? " text-primary" : "text-text"
                  } font-semibold w-[130px] text-[20px] cursor-pointer  hover:bg-[#b1b1b156] py-4 px-2`}
                  onClick={() => setMostOrNew(true)}
                >
                  Most popular
                </span>
                <span
                  className={` ${
                    !mostOrNew ? " text-primary" : "text-text"
                  } font-semibold w-[130px] text-center text-[20px] cursor-pointer  hover:bg-[#b1b1b156] py-4 px-2`}
                  onClick={() => setMostOrNew(false)}
                >
                  New
                </span>
              </div>
              <div className="  block">
                {getCoursesCatsLoading || isFetching ? (
                  <div className=" py-[80px] text-center w-fit mx-auto">
                    <Hourglass
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={["#EC5252", "#ec525252"]}
                    />
                  </div>
                ) : (
                  <>
                    {mostOrNew ? (
                      <>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Splide
                          aria-label="recomendation-course"
                          options={splideOptionsRecoXL}
                        >
                          {getCoursesCats?.payload.popular.map((e) => (
                            <SplideSlide key={e.id}>
                              <Course CourseData={e} />
                            </SplideSlide>
                          ))}
                        </Splide>
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Splide
                          aria-label="recomendation-course"
                          options={splideOptionsRecoXL}
                        >
                          {getCoursesCats?.payload.new.map((e) => (
                            <SplideSlide key={e.id}>
                              <Course CourseData={e} />
                            </SplideSlide>
                          ))}
                        </Splide>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          <div className="mt-[-100px] py-2">
            <h3 className=" mt-4 text-[26px] font-semibold tracking-[-1px]  md:w-[70%] leading-7">
              Inspiring Learning: Quotes to Ignite Student Passion for Knowledge
            </h3>
            <div className="  flex flex-wrap items-center justify-center gap-4  pb-4 pt-4">
              {" "}
              {randomQuotes.map((e) => (
                <Qoute QouteData={e} key={e.quote} />
              ))}
            </div>
          </div>
          <div className=" z-0 flex gap-3 flex-row flex-wrap items-center justify-center">
            {getCoursesCatsLoading || isFetching ? (
              <div className=" py-8">
                {" "}
                <Hourglass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#EC5252", "#ec525252"]}
                />
              </div>
            ) : (
              <>
                {getCoursesCats?.payload.courses.map((e) => (
                  <CourseInCat e={e} key={e.id} />
                ))}
              </>
            )}
          </div>
          {/* <div className="flex w-[325px] mx-auto items-center justify-center overflow-x-auto sm:justify-center pages-Courses-Cat pt-4">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          previousLabel=" "
          nextLabel=" "
          showIcons
        />
      </div> */}
          <div className=" py-2 flex justify-center items-center">
            <div className=" px-8 md:px-2 py-4 sm:py-8 md:py-0 w-[300px] sm:w-[95%] lg:w-[80%]  bg-white border-2 shadow-md my-4 flex-col sm:flex-row flex justify-center items-center">
              <div className=" max-w-[380px] md:w-[40%] lg:w-[35%]">
                <img src={img1} alt="" className=" object-contain w-full" />
              </div>
              <div className=" md:w-[55%] lg:w-[60%] flex flex-col gap-4">
                <h3 className=" font-bold text-[22px] leading-6 md:text-[26px] text-text">
                  Unlock Your Potential: Invest in Knowledge Today!
                </h3>
                <p className="  text-accent-1 leading-[18px] w-[95%]">
                  Invest in your future and own knowledge! Purchase courses now
                  to develop your skills and achieve your personal and
                  professional goals.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesByCat;
