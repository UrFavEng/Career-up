import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../store/apislice";
import { useForm } from "react-hook-form";
import { Hourglass } from "react-loader-spinner";
type dataTypes = {
  fullname: string;
  email: string;
  password: string;
};
const Login = () => {
  const [loading, setLoading] = useState<boolean>();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<dataTypes>({ mode: "onBlur" });
  const [signin] = useSigninMutation();
  const OnSubmit = (data: dataTypes) => {
    setLoading(true);

    signin(data)
      .unwrap()
      .then((fulfilled) => {
        setLoading(false);
        localStorage.setItem("idUserCareerup", fulfilled?.payload?.user?.id);
        localStorage.setItem(
          "roleUserCareerup",
          fulfilled?.payload?.user?.role
        );
        localStorage.setItem(
          "fullnameUserCareerup",
          fulfilled?.payload?.user?.fullname
        );
        localStorage.setItem(
          "avatarUrlUserCareerup",
          fulfilled?.payload?.user?.avatarUrl
        );
        localStorage.setItem(
          "emailUrlUserCareerup",
          fulfilled?.payload?.user?.email
        );
        navigate("/");

        console.log(fulfilled?.payload);
      })
      .catch((rejected) => {
        setLoading(false);

        console.error(rejected);
      });
  };

  return (
    <div>
      <div className="pt-[25px] flex justify-center items-center flex-col w-[95%] sm:w-[500px] m-auto">
        <p className=" font-medium text-left w-full mb-[6px] text-[14px] text-text">
          Log in to your Career up account
        </p>
        <form
          noValidate
          onSubmit={handleSubmit(OnSubmit)}
          action=""
          className="flex justify-center items-center flex-col gap-3  w-full "
        >
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="pl-[10px] w-full h-[50px] outline-none border-b-2"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="pl-[10px] w-full h-[50px] outline-none border-b-2"
          />
          {loading ? (
            <Hourglass
              visible={true}
              height="43"
              width="43"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#EC5252", "#ec525252"]}
            />
          ) : (
            <input
              type="submit"
              value="Log in"
              className=" bg-primary py-[8px] px-[5px] cursor-pointer text-text  font-extrabold text-[22px] w-full h-[50px] tracking-[1px] leading-[0px]"
            />
          )}
        </form>
        <div className=" bg-[#777] w-full h-[0.5px] my-[8px]"></div>
        <p className="text-text text-[15px]">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className=" text-primary font-semibold text-[17px] underline cursor-pointer"
          >
            {" "}
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
