import { MdNotifications } from "react-icons/md";

import { useGetmeQuery } from "../store/apislice";
import { Outlet, useNavigate } from "react-router-dom";
const Instructor = () => {
  const navigate = useNavigate();

  const { data: dataUser } = useGetmeQuery();

  return (
    <div className=" min-h-[100vh] bg-background">
      <div className=" flex flex-row-reverse gap-4 py-6 px-8 items-center">
        <div className=" par-cat relative">
          <div className=" w-[40px]">
            <img
              className=" w-full rounded-full"
              src={dataUser?.payload.avatarUrl}
              alt=""
            />
          </div>
          <div className="cat border-[1px] absolute z-40 shadow-md left-[-200px] top-[45px] md:left-[-210px] lg:left-[-220px] xl:left-[-170px] md:top-[44px] lg:top-[40px] xl:top-[44px]">
            <ul className=" bg-white">
              <li
                onClick={() => {
                  navigate(`/myprofile/${dataUser?.payload.id}`);
                }}
                className=" border-b-2 cursor-pointer hover:bg-[#e7e7e7]"
              >
                <div className="flex gap-3 p-3 items-center">
                  <div className="w-[50px]">
                    {dataUser?.payload.avatarUrl !== null &&
                      dataUser?.payload.avatarUrl !== undefined && (
                        <img
                          src={dataUser?.payload.avatarUrl}
                          alt=""
                          className=" rounded-full"
                        />
                      )}
                  </div>
                  <div>
                    <h3 className="text-text font-semibold text-[17px] leading-[20px]">
                      {dataUser?.payload.fullname}
                    </h3>
                    <p className="text-[#626262] font-medium text-[14px]">
                      {dataUser?.payload.email}
                    </p>
                  </div>
                </div>
              </li>
              <li className=" border-b-2 hover:bg-[#f0f0f0] p-3 text-text font-bold hover:text-[#000]">
                Student
              </li>
              <li className="hover:bg-[#f0f0f0]  border-b-2 p-3 text-text font-bold hover:text-[#000]">
                Notifications
              </li>
              <li className="hover:bg-[#f0f0f0] px-3 py-2 text-text font-bold hover:text-[#000]">
                Public profile
              </li>
              <li className="hover:bg-[#f0f0f0]  border-b-2 px-3 py-2 text-text font-bold hover:text-[#000]">
                Edit profile
              </li>
              <li className="px-3 cursor-pointer hover:bg-secondary p-3 text-primary font-bold text-[18px]">
                Log out
              </li>
            </ul>
          </div>
        </div>
        <div className=" par-cat  relative text-[30px] text-primary">
          <MdNotifications />
          <div className=" absolute cat w-[300px] font-bold text-text hover:text-black text-[18px] p-4 left-[-180px] text-center bg-secondary  shadow-xl leading-[20px]">
            الباك اند لسه معملهاش.
          </div>
        </div>
        <div className=" par-cat relative text-[18px] font-medium text-text hover:text-black">
          Student
          <div className=" absolute cat w-[300px] font-bold text-text hover:text-black text-[18px] p-4 left-[-180px] text-center bg-secondary  shadow-xl leading-[20px]">
            Switch to the student view here - get back to the courses you’re
            taking.
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Instructor;
