import { useGetmeQuery } from "../store/apislice";
import { useState } from "react";

const GetMe = () => {
  const [showPrivate, setShowPrivate] = useState<boolean>(false);

  const avatarUrl = localStorage.getItem("avatarUrlUserCareerup");
  const { data, error } = useGetmeQuery();
  console.log(data, error);
  return (
    <div className="container py-[30px]">
      <div className=" min-h-[68vh] border-2">
        <div className=" border-b-2 py-[10px] flex items-center justify-center gap-2 sm:gap-4 flex-col sm:flex-row">
          <div
            onClick={() => {
              setShowPrivate(false);
            }}
            className=" cursor-pointer "
          >
            <h1 className=" text-text font-bold text-center text-[25px] tracking-[0.5px]">
              Public profile
            </h1>
            <p className=" text-text text-center tracking-[0.5px] font-medium text-[15px] px-[10px]">
              Add information about yourself
            </p>
          </div>
          <div className=" border-2 h-[1px] w-[100px] sm:w-[1px] sm:h-[80px]"></div>
          <div
            onClick={() => {
              setShowPrivate(true);
            }}
            className=" cursor-pointer "
          >
            <h1 className=" text-text font-bold text-center text-[25px] tracking-[0.5px]">
              private profile
            </h1>
            <p className=" text-text text-center tracking-[0.5px] font-medium text-[15px] px-[10px]">
              Edit your private information
            </p>
          </div>
        </div>
        <div className=" flex flex-col sm:flex-row items-center justify-center gap-3 py-4">
          <div>
            {avatarUrl !== null && avatarUrl !== undefined && (
              <img src={avatarUrl} alt="" className="w-[60px] rounded-full" />
            )}{" "}
          </div>
          <div>
            <h1 className=" text-[20px] font-bold text-primary">
              {localStorage.getItem("fullnameUserCareerup")}
            </h1>
          </div>
        </div>
        <div className=" h-1 w-full border-b-2"></div>
        <div className="py-[25px]">
          {showPrivate ? (
            <form
              action=""
              className="flex flex-col  w-[95%] sm:w-[80%] m-auto gap-2 pt-[30px]"
            >
              <input
                type="email"
                placeholder="Email"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                type="password"
                placeholder="New password"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                type="password"
                placeholder="Enter password again"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />{" "}
              <input
                type="submit"
                value="Save"
                className=" h-[40px] w-[60px] flex justify-center items-center cursor-pointer bg-primary mt-[20px]"
              />
            </form>
          ) : (
            <form
              action=""
              className="flex flex-col  w-[95%] sm:w-[80%] m-auto gap-2"
            >
              <p className=" text-text text-[15px] font-semibold">Basics:</p>
              <input
                type="text"
                placeholder="Fullname"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <textarea
                className="text-black pl-[10px] outline-none focus:border-b-2 focus:border-primary"
                placeholder="bio"
              ></textarea>
              <input
                type="text"
                placeholder="Job"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />{" "}
              <label
                htmlFor="gender"
                className=" text-text font-medium text-[13px] pt-[5px]"
              >
                Gender:
              </label>
              <select
                id="gender"
                className=" h-[30px] pl-[5px] outline-none focus:border-b-2"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className=" h-1 w-full border-b-2 mt-2"></div>
              <p className=" text-text text-[15px] font-semibold">Links:</p>
              <input
                type="text"
                placeholder="Facebook"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                type="text"
                placeholder="Twitter"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                type="text"
                placeholder="Youtube"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                type="text"
                placeholder="Linkedin"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                type="submit"
                value="Save"
                className=" h-[40px] w-[60px] flex justify-center items-center cursor-pointer bg-primary mt-[20px]"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetMe;
