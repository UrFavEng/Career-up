import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
const EditCourse = () => {
  return (
    <div>
      <div className="Nav-EditCourse flex justify-center items-center gap-4">
        <div className=" text-[22px] text-accent-1 font-semibold">
          <NavLink to="" end>
            Course Landing Page
          </NavLink>
        </div>
        <div className=" w-[1px] h-[40px] bg-[#d1d1d1]"></div>
        <div className="text-accent-1 text-[22px] font-semibold">
          <NavLink to="Curriculum">Curriculum</NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default EditCourse;
