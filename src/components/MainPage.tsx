import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";
import {
  mainPage1,
  mainPage2,
  mainPage1min,
  mainPage2min,
  instructor,
} from "../assests";
import {
  useBeInstructorMutation,
  useGetHomeQuery,
  useGetmeQuery,
} from "../store/apislice";
import { Course } from ".";
import Qoute from "./Qoute";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();
  const { data: getHome, isLoading: getHomeLoading } = useGetHomeQuery();
  const { data: dataUser, error: errGetme } = useGetmeQuery();
  const splideOptions = {
    perMove: 1,
    rewind: true,
    rewindSpeed: 1000,
    pagination: false,
    type: "loop",
    perPage: 1,
    rewindByDrag: true,
    gap: 10,
    autoWidth: false,
  };
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
  interface Quote {
    quote: string;
    author: string;
  }

  const quotesArray: Quote[] = [
    {
      quote:
        "Learning is not the end of the world, but the beginning of a new one.",
      author: "Philip Weyer",
    },
    {
      quote: "Learning is the only thing that always stays with you.",
      author: "B.B. King",
    },
    {
      quote: "Knowledge is the most powerful weapon to change the world.",
      author: "Neil Armstrong",
    },
    {
      quote: "Education is not preparation for life; education is life itself.",
      author: "John Dewey",
    },
    {
      quote:
        "If you want to achieve something great in life, learn how to endure failure.",
      author: "Jeffrey Benjamin",
    },
    {
      quote:
        "Learning is not about getting answers, but asking the right questions.",
      author: "Carl Sagan",
    },
    {
      quote:
        "You can't change your past, but you can change your future through learning.",
      author: "Switcer Singh",
    },
    {
      quote:
        "Learning is not just getting a certificate; it's exploring the world and expanding your understanding.",
      author: "Mandy Haldane",
    },
    {
      quote:
        "Knowledge gives you the power to achieve invention and creativity.",
      author: "Niels Bohr",
    },
    {
      quote: "Knowledge reduces the distance between dreams and reality.",
      author: "Malcolm Forbes",
    },
    {
      quote:
        "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
    },
    {
      quote:
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      author: "Malcolm X",
    },
    {
      quote:
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: "Dr. Seuss",
    },
    {
      quote: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin",
    },
    {
      quote:
        "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
      author: "Brian Herbert",
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
      quote: "The only source of knowledge is experience.",
      author: "Albert Einstein",
    },
    {
      quote:
        "The beautiful thing about learning is nobody can take it away from you.",
      author: "B.B. King",
    },
    {
      quote: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
    },
  ];
  function getRandomQuotes() {
    const shuffledQuotes = quotesArray.sort(() => 0.5 - Math.random());
    return shuffledQuotes.slice(0, 4);
  }

  const randomQuotes = getRandomQuotes();
  const sweetAlertDone = () => {
    Swal.fire({
      icon: "success",
      title: "You'r an Instructor now",
    });
  };
  const [beInstructor] = useBeInstructorMutation();
  const sweetAlertbeInstructor = () => {
    let timerInterval: NodeJS.Timeout | null = null; // تعيين قيمة افتراضية مناسبة

    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 9000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector("b"); // Use optional chaining here
        if (timer) {
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        }
      },
      willClose: () => {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      },
    }).then(() => {});
  };
  const beInstructorFunc = async () => {
    sweetAlertbeInstructor();
    beInstructor()
      .unwrap()
      .then(() => {
        sweetAlertDone();
        // console.log(fulfilled.payload.user.role);
      })
      .catch(() => {
        // console.log(rejected);
      });
  };

  return (
    <div>
      <div className="HeroSec container h-[70vh] overflow-hidden sm:h-[500px] md:h-auto flex flex-col justify-center">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Splide options={splideOptions}>
          <SplideSlide>
            <div className=" relative justify-center items-center  flex  flex-col-reverse ">
              <img
                src={mainPage1}
                alt="Image 1"
                className=" hidden  md:block  lg:w-[1650px] h-[350px] lg:h-[400px]"
              />
              <div className="mt-[80px] md:mt-0 h-[180px] md:h-auto w-[100%] md:w-[45%] lg:w-[40%] xl:w-[35%] md:shadow-2xl md:absolute z-[50] md:py-8 md:pl-7 md:top-[50%] left-[5%] translate-y-[-50%] bg-[#f3f4f6] md:bg-[#fff] text-[#1c1d1f]">
                <h3 className="font-extrabold text-[22px] sm:text-[28px] md:text-[28px] lg:text-[42px] lg:w-[100%] mb-2 lg:mb-3 leading-[30px] lg:leading-[38px] w-[95%]">
                  Skills that drive you forward
                </h3>
                <p className=" w-[90%]  leading-[18px]">
                  Technology and the world of work change fast — with us, you’re
                  faster. Get the skills to achieve goals and stay competitive.
                </p>
                <form className=" bg-transparent  mt-[20px] block md:hidden w-[100%] relative">
                  <input
                    className=" text-[17px] font-semibold pl-4 focus:outline-none h-[40px] w-[100%] bg-transparent border-[1px] border-[#bcbcbc]"
                    type="text"
                    placeholder="What do you want to learn?"
                  />{" "}
                  <button
                    type="submit"
                    className=" absolute cursor-pointer top-[50%] translate-y-[-50%] right-8"
                  >
                    <FaSearch />{" "}
                  </button>{" "}
                </form>
              </div>
              <img
                src={mainPage1min}
                alt="Image 1"
                className=" w-full block md:hidden h-auto"
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="h-full relative  flex justify-center items-center  flex-col-reverse ">
              <img
                src={mainPage2}
                alt="Image 2"
                className=" hidden  md:block   lg:w-[1650px] h-[350px] lg:h-[400px]"
              />{" "}
              <div className="mt-[80px]  md:mt-0 h-[180px] md:h-auto w-[100%] md:w-[55%] lg:w-[50%] xl:w-[38%] md:shadow-2xl md:absolute z-[50] md:py-8 md:pl-5 lg:pl-7 top-[50%] left-[5%] translate-y-[-50%] bg-[#f3f4f6] md:bg-[#fff] text-[#1c1d1f]">
                <h3 className="font-extrabold text-[22px] sm:text-[28px] md:text-[28px] lg:text-[42px] lg:w-[100%] mb-2 lg:mb-3 leading-[30px] lg:leading-[38px]">
                  Learning that gets you
                </h3>
                <p className=" w-[90%] leading-[18px]">
                  Skills for your present (and your future). Get started with
                  us.
                </p>{" "}
                <form className="  bg-transparent mt-[40px] block md:hidden w-[100%] relative">
                  <input
                    className=" text-[17px] font-semibold pl-4 focus:outline-none h-[40px] w-[100%] bg-transparent border-[1px] border-[#bcbcbc]"
                    type="text"
                    placeholder="What do you want to learn?"
                  />{" "}
                  <button
                    type="submit"
                    className=" absolute cursor-pointer top-[50%] translate-y-[-50%] right-8"
                  >
                    <FaSearch />{" "}
                  </button>{" "}
                </form>
              </div>
              <img
                src={mainPage2min}
                alt="Image 2"
                className=" w-full block md:hidden h-auto"
              />
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div className=" bg-[#f7f9fa] px-4 py-5 sm:mt-6">
        <div className="container">
          {" "}
          <h1 className=" mt-4 text-[26px] font-semibold tracking-[-1px]  md:w-[70%] leading-7">
            Embark on a Journey of Wisdom: Motivational Quotes to Ignite Your
            Learning Adventure
          </h1>
          <div className=" hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4  pb-4 pt-4">
            {randomQuotes.map((e) => (
              <Qoute QouteData={e} key={e.quote} />
            ))}
          </div>
        </div>
      </div>
      {getHomeLoading ? (
        <div className=" pt-40 pb-72 flex justify-center items-center">
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
          <div className="splid-Courses-MainPage pb-10 pt-2 container">
            <h3 className=" px-4 mt-4 text-[24px] md:text-[26px] font-medium md:font-semibold  tracking-[-1px] w-[90%] leading-7">
              Pick Your Courses: A Curated List of Recommended Courses for You
            </h3>
            <div className="  block">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Splide
                aria-label="recomendation-course"
                options={splideOptionsRecoXL}
              >
                {getHome?.payload.recommendations.map((e) => (
                  <SplideSlide key={e.id}>
                    <Course CourseData={e} />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
          <div className="splid-Courses-MainPage mt-[-90px] pb-10 pt-2 border-t-2 container">
            <h3 className=" px-4 mt-4 text-[24px] md:text-[26px] font-medium md:font-semibold tracking-[-1px] w-[90%] leading-7">
              Discover the Hottest Courses: Bestsellers for Success{" "}
            </h3>
            <div className=" block">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Splide
                aria-label="recomendation-course"
                options={splideOptionsRecoXL}
              >
                {getHome?.payload.recommendations.map((e) => (
                  <SplideSlide key={e.id}>
                    <Course CourseData={e} />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </>
      )}
      <div className="bg-white mt-[-90px] shadow-2xl pt-6 pb-16 flex justify-center items-center">
        <div className="  container lg:w-[75%] flex flex-col lg:flex-row lg:items-center gap-10 lg:justify-center">
          <div className=" flex justify-center">
            <img
              src={instructor}
              alt=""
              className="  min:w-[550px] lg:w-auto"
            />
          </div>
          <div className=" lg:w-[68%] flex lg:block flex-col items-center">
            <h2 className=" text-center lg:text-left text-text  text-[32px] lg:text-[32px] xl:text-[40px] font-bold mb-2  lg:mb-2 xl:mb-4 leading-8">
              {dataUser?.payload.role === "instructor" &&
              !dataUser?.error &&
              !errGetme ? (
                <div>Start teaching now</div>
              ) : (
                "Become an instructor "
              )}
            </h2>
            <p className=" text-accent-1 font-meium tracking-[-1px] text-[20px] leading-6 md:leading-7 text-center lg:text-left mb-2 md:mb-4 w-[95%] sm:w-[85%] lg:w-[90%]">
              {dataUser?.payload.role === "instructor" &&
              !dataUser?.error &&
              !errGetme
                ? "Keep sharing your knowledge and skills with millions of enthusiastic learners worldwide through Career up. Let's make learning an enjoyable and beneficial experience for all, and together, let's build an educational community that thrives on knowledge and creativity!"
                : "Instructors from around the world teach millions of learners on Career up. We provide the tools and skills to teach what you love."}
            </p>
            <p className=" cursor-pointer bg-text w-fit py-2 xl:py-3 px-2 xl:px-2 text-white hover:text-secondary font-medium text-[16px] xl:text-[18px] mt-2 sm:mt-5">
              {dataUser?.payload.role === "instructor" &&
              !dataUser?.error &&
              !errGetme ? (
                <div onClick={() => navigate("/instructor")}>
                  Start teaching today
                </div>
              ) : (
                <div
                  onClick={() =>
                    !dataUser?.error && !errGetme
                      ? beInstructorFunc()
                      : navigate("/login")
                  }
                >
                  {" "}
                  Start teaching today
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
