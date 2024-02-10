import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import { ErrorSignUP, UserSignUP } from "../types/types.model";
import { useSignUpMutation } from "../store/apislice";

const Signup = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSignUP>();
  const [signUP, { isLoading }] = useSignUpMutation();

  const onSubmit: SubmitHandler<UserSignUP> = (data) => {
    setErr("");
    console.log(data);
    signUP(data)
      .unwrap()
      .then((fulfilled) => {
        setErr("");
        localStorage.setItem(
          "idUserCareerup",
          fulfilled?.payload?.user?.id.toString()
        );
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
      })
      .catch((rejected: ErrorSignUP) => {
        setErr(rejected.data.message);
      });
  };

  return (
    <div className="pt-[25px] flex justify-center items-center flex-col w-[95%] sm:w-[500px] m-auto h-[72vh]">
      <p className=" font-medium text-left w-full mb-[6px] text-[14px] text-text">
        Sign up and develop your skills
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        action=""
        className="flex justify-center items-center flex-col gap-3  w-full "
      >
        <input
          {...register("fullname", { required: "Name is required" })}
          type="text"
          placeholder="Full Name"
          className="pl-[10px] w-full h-[50px] outline-none border-b-2"
        />
        {errors.fullname?.message && (
          <p className="w-[100%] tracking-[1px] leading-[5px] text-[17] font-medium text-primary py-[5px]">
            {errors.fullname?.message}
          </p>
        )}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
          type="email"
          placeholder="Email"
          className="pl-[10px] w-full h-[50px] outline-none border-b-2"
        />
        {errors.email?.message && (
          <p className="w-[100%] tracking-[1px] leading-[5px] text-[17] font-medium text-primary py-[5px]">
            {errors.email?.message}
          </p>
        )}
        <input
          {...register("password", { required: "password is required" })}
          type="password"
          placeholder="Password"
          className="pl-[10px] w-full h-[50px] outline-none border-b-2"
        />{" "}
        {errors.password?.message && (
          <p className="w-[100%] tracking-[1px] leading-[5px] text-[17] font-medium text-primary py-[5px]">
            {errors.password?.message}
          </p>
        )}
        {isLoading ? (
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
            value="Sign up"
            className=" bg-primary py-[8px] px-[5px] cursor-pointer text-text  font-extrabold text-[22px] w-full h-[50px] tracking-[1px] leading-[0px]"
          />
        )}
      </form>
      {err && <p className=" text-primary text-[17px] font-semibold">{err}</p>}
      <div className=" bg-[#777] w-full h-[0.5px] my-[8px]"></div>
      <p className="text-text text-[15px]">
        Already have an account?{" "}
        <span
          onClick={() => {
            navigate("/login");
          }}
          className=" text-primary font-semibold text-[17px] underline cursor-pointer"
        >
          {" "}
          Log in
        </span>
      </p>
    </div>
  );
};

export default Signup;
