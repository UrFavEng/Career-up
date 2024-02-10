import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Hourglass } from "react-loader-spinner";
import { ErrorSignIN, UserSignin } from "../types/types.model";

const Login = () => {
  const [err, setErr] = useState<string>("");

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserSignin>();
  const [signin, { isLoading }] = useSigninMutation();
  const onSubmit: SubmitHandler<UserSignin> = (data) => {
    setErr("");
    console.log(data);
    signin(data)
      .unwrap()
      .then((fulfilled) => {
        setErr("");
        console.log(fulfilled);
        navigate("/");
      })
      .catch((rejected: ErrorSignIN) => {
        console.log(rejected);
        setErr(rejected.data.message);
      });
  };

  return (
    <div className=" h-[70vh] flex justify-center items-center">
      <div className="pt-[25px] flex justify-center items-center flex-col w-[95%] sm:w-[500px] m-auto">
        <p className=" font-medium text-left w-full mb-[6px] text-[14px] text-text">
          Log in to your Career up account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          action=""
          className="flex justify-center items-center flex-col gap-3  w-full "
        >
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
          <input
            {...register("password", { required: "password is required" })}
            type="password"
            placeholder="Password"
            className="pl-[10px] w-full h-[50px] outline-none border-b-2"
          />
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
            <>
              {" "}
              <input
                type="submit"
                value="Log in"
                className=" bg-primary py-[8px] px-[5px] cursor-pointer text-text  font-extrabold text-[22px] w-full h-[50px] tracking-[1px] leading-[0px]"
              />
              {err && (
                <p className=" text-primary text-[17px] font-semibold">{err}</p>
              )}
            </>
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
