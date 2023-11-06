import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder, MdKeyboardArrowRight } from "react-icons/md";
import { useLogOutMutation } from "../store/apislice";
import { Hourglass } from "react-loader-spinner";
const Navbar = () => {
  const avatarUrl = localStorage.getItem("avatarUrlUserCareerup");
  const [LogOut, { isLoading }] = useLogOutMutation();
  const handleCreateEmptyPost = async () => {
    try {
      // Call the mutation function without any data
      const response = await LogOut();
      localStorage.clear();
      navigate("/");
      // Handle the response
      console.log(response);
    } catch (err) {
      // Handle any errors
      console.error(err);
    }
  };
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  return (
    <div className=" navbar px-[20px] bg-white py-[20px]  sticky w-full z-50 shadow-xl">
      <div className="flex  justify-between items-center">
        <div className=" flex items-center gap-3 xl:gap-6">
          <div className="arrow-container relative hidden md:block">
            <h1
              onClick={() => {
                navigate("/");
              }}
              className="text-[30px] leading-[26px] text-text font-bold cursor-pointer hidden md:block"
            >
              Career up
            </h1>
            <div className=" absolute text-[25px] top-[-40%] right-[10px] text-primary  hidden md:block">
              <MdKeyboardArrowUp />
            </div>
          </div>
          <div className="text-text font-medium cursor-pointer ">
            <div className="par-cat relative top-[3px] hidden md:block">
              Categories <div className="cat">hver</div>
            </div>
            <div className=" text-[25px] text-text par-cat relative top-[3px] block md:hidden">
              <FaBars />
              <div className="cat z-10 left-[-20px] top-[px] absolute ">
                <div className="p-[20px] cursor-default">
                  <ul className="text-[20px] w-[220px] text-text bg-secondary cursor-default">
                    {localStorage.getItem("fullnameUserCareerup") && (
                      <li
                        onClick={() => {
                          navigate(
                            `/myprofile/${localStorage.getItem(
                              "idUserCareerup"
                            )}`
                          );
                        }}
                        className="cursor-pointer px-4 py-6 ease-in duration-200 border-b-2 bg-[#c0c0c0] hover:bg-[#e7e7e7] relative"
                      >
                        <div className="flex gap-2">
                          <div>
                            {avatarUrl !== null && avatarUrl !== undefined && (
                              <img
                                src={avatarUrl}
                                alt=""
                                className="w-[45px] rounded-full"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className=" text-text text-[16px]">
                              Hi, {localStorage.getItem("fullnameUserCareerup")}
                            </h3>
                            <p className=" text-[15px] text-[#626262]">
                              Welcome Back
                            </p>
                          </div>
                        </div>
                        <div className=" absolute top-[35px] right-0 text-primary text-[28px]">
                          <MdKeyboardArrowRight />
                        </div>
                      </li>
                    )}
                    <li
                      onClick={() => {
                        navigate("/login");
                      }}
                      className={` ${
                        localStorage.getItem("fullnameUserCareerup")
                          ? "hidden"
                          : "block"
                      } px-4 ease-in duration-200 border-b-2 text-primary cursor-pointer hover:bg-background`}
                    >
                      Log in
                    </li>
                    <li
                      onClick={() => {
                        navigate("/signup");
                      }}
                      className={`px-4 ${
                        localStorage.getItem("fullnameUserCareerup")
                          ? "hidden"
                          : "block"
                      } ease-in duration-200 border-b-2 text-primary cursor-pointer hover:bg-background`}
                    >
                      Sign up
                    </li>
                    {localStorage.getItem("fullnameUserCareerup") && (
                      <>
                        <li className="px-4 py-[5px] ease-in duration-200 border-b-2  cursor-pointer hover:bg-background text-text text-[16px] font-medium  hover:text-[#686868]">
                          My learning
                        </li>
                        <li className="px-4 py-[5px]  ease-in duration-200 border-b-2  cursor-pointer hover:bg-background text-text text-[16px] font-medium hover:text-[#686868]">
                          Teach on Career up
                        </li>
                        <li
                          onClick={() => {
                            handleCreateEmptyPost();
                          }}
                          className="px-4 ease-in duration-200 border-b-2  cursor-pointer hover:bg-background p-3 text-primary font-bold text-[18px]"
                        >
                          {isLoading ? (
                            <Hourglass
                              visible={true}
                              height="26"
                              width="26"
                              ariaLabel="hourglass-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              colors={["#EC5252", "#ec525252"]}
                            />
                          ) : (
                            "Log out"
                          )}
                          {/* {open ? <Logout setOpen={setOpen} /> : "Log out"} */}
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form
            action=""
            className={`${
              localStorage.getItem("idUserCareerup")
                ? "hidden md:flex md:w-[265px] lg:w-[350px] xl:w-[550px]"
                : "hidden md:flex md:w-[380px] lg:w-[580px]"
            }   justify-center items-center`}
          >
            <input
              type="text"
              placeholder="Search for anything"
              className={`${
                localStorage.getItem("idUserCareerup")
                  ? "md:w-[200px] lg:w-[270px] xl:w-[470px]"
                  : "md:w-[315px] lg:w-[500px]"
              }  py-[6px] pl-[20px] outline-none   rounded-s-full h-[40px]  placeholder:text-text bg-background `}
            />
            <input
              type="submit"
              value={"Search"}
              className=" md:w-[65px] lg:w-[80px] bg-primary rounded-e-full h-[40px]  text-text font-medium pr-1 cursor-pointer"
            />
          </form>
          <div className="arrow-container relative block md:hidden">
            <h1
              onClick={() => {
                navigate("/");
              }}
              className="text-[30px] leading-[26px] text-text font-bold cursor-pointer block md:hidden"
            >
              Career up
            </h1>
            <div className=" absolute text-[25px] top-[-40%] right-[10px] text-primary  ">
              <MdKeyboardArrowUp />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div
            className="block md:hidden text-[23px] cursor-pointer"
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <FaSearch />
          </div>
          <div className="block md:hidden text-[28px] cursor-pointer">
            <AiOutlineShoppingCart />
          </div>
          {/* md, lg and xl */}
          {!localStorage.getItem("idUserCareerup") && (
            <div className=" text-text  font-semibold cursor-pointer text-[15px] hidden xl:block">
              Teach on Career up
            </div>
          )}
          <div
            onClick={() => {
              navigate("/login");
            }}
            className={`hidden ${
              localStorage.getItem("idUserCareerup") ? "lg:hidden" : "lg:flex"
            }  cursor-pointer   font-semibold bg-white text-[28px] xl:text-[32px] justify-center items-center pl-[5px] pr-[10px]`}
          >
            <AiOutlineShoppingCart />
          </div>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className={`hidden ${
              localStorage.getItem("idUserCareerup") ? "md:hidden" : "md:flex"
            } md:w-[65px] lg:w-[70px] md:h-[35px] lg:h-[35px] xl:h-[40px] cursor-pointer  text-[17px]  font-semibold bg-white border-[1px] border-black  justify-center items-center`}
          >
            Log in
          </div>
          <div
            onClick={() => {
              navigate("/signup");
            }}
            className={` hidden ${
              localStorage.getItem("idUserCareerup") ? "md:hidden" : "md:flex"
            } md:w-[65px] lg:w-[70px] md:h-[35px] lg:h-[35px] xl:h-[40px] cursor-pointer text-[17px]  font-semibold bg-black text-white border-[1px] border-black    justify-center items-center`}
          >
            Sign up
          </div>
          <div
            className={` ${
              localStorage.getItem("idUserCareerup")
                ? "hidden md:flex flex-row-reverse items-center gap-4 xl:gap-7"
                : "hidden"
            }`}
          >
            <div className=" w-[35px] xl:w-[45px]  hidden md:flex   relative par-cat">
              <div className="cat absolute p-[20px] md:left-[-290px] lg:left-[-290px] xl:left-[-280px] md:top-[38px] lg:top-[38px] xl:top-[45px]">
                <ul className="bg-secondary w-[300px]">
                  <li
                    onClick={() => {
                      navigate(
                        `/myprofile/${localStorage.getItem("idUserCareerup")}`
                      );
                    }}
                    className=" border-b-2 cursor-pointer hover:bg-[#e7e7e7]"
                  >
                    <div className="flex gap-3 p-3 items-center">
                      <div className="w-[50px]">
                        {avatarUrl !== null && avatarUrl !== undefined && (
                          <img
                            src={avatarUrl}
                            alt=""
                            className=" rounded-full"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-text font-semibold text-[17px] leading-[20px]">
                          {localStorage.getItem("fullnameUserCareerup")}
                        </h3>
                        <p className="text-[#626262] font-medium text-[14px]">
                          {localStorage.getItem("emailUrlUserCareerup")}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="border-b-2 cursor-default">
                    <ul className="p-3 flex flex-col gap-1">
                      <li className="text-text text-[16px] font-medium cursor-pointer hover:text-[#686868]">
                        My learning
                      </li>
                      <li className="text-text text-[16px] font-medium cursor-pointer hover:text-[#686868]">
                        My cart
                      </li>
                      <li className="text-text text-[16px] font-medium cursor-pointer hover:text-[#686868]">
                        Teach on Career up
                      </li>
                    </ul>
                  </li>
                  <li
                    onClick={() => {
                      handleCreateEmptyPost();
                    }}
                    className=" border-b-2 cursor-pointer  hover:bg-background"
                  >
                    <div className="p-3 text-primary font-bold text-[18px]">
                      {" "}
                      {isLoading ? (
                        <Hourglass
                          visible={true}
                          height="26"
                          width="26"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["#EC5252", "#ec525252"]}
                        />
                      ) : (
                        "Log out"
                      )}
                      {/* {open ? <Logout setOpen={setOpen} /> : "Log out"} */}
                    </div>
                  </li>
                </ul>
              </div>
              {avatarUrl !== null && avatarUrl !== undefined && (
                <img
                  src={avatarUrl}
                  alt=""
                  className="rounded-full cursor-pointer"
                />
              )}
            </div>
            <div className="hidden items-center gap-1 lg:gap-1 xl:gap-2 flex-row-reverse md:flex">
              {/* <div className=" text-[25px] xl:text-[32px] cursor-pointer">
                <MdOutlineNotifications />
              </div> */}
              <div className=" text-[25px] xl:text-[32px] cursor-pointer">
                <AiOutlineShoppingCart />
              </div>
              <div className="text-[25px] xl:text-[32px] cursor-pointer">
                <MdFavoriteBorder />
              </div>
            </div>
            <div className="  hidden md:flex items-center gap-3 xl:gap-7">
              <p className=" cursor-pointer text-text font-medium text-[16px] hidden lg:block">
                Teach on Career up
              </p>
              <p className=" cursor-pointer text-text font-medium text-[16px] hidden md:block">
                My learning
              </p>
            </div>
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="pt-[20px] block md:hidden">
          <form action="" className="  md:hidden w-full text-center">
            <input
              type="text"
              placeholder="Search for anything"
              className=" py-[6px] pl-[20px] outline-none w-[75%]  rounded-s-full h-[40px]  placeholder:text-text bg-background "
            />
            <input
              type="submit"
              value={"Search"}
              className=" text-[14px] sm:text-[16px] bg-primary rounded-e-full h-[40px] w-[20%] text-text font-medium pr-1 cursor-pointer"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
