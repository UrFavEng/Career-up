import { useNavigate } from "react-router-dom";
import { useEditUserDataMutation } from "../store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserSignin } from "../types/types.model";
import Swal from "sweetalert2";
import { useState } from "react";
import { Hourglass } from "react-loader-spinner";

const AccountSecurity = () => {
  const navigate = useNavigate();
  const [submitFormData, { isLoading: loadingSendData }] =
    useEditUserDataMutation();
  const { handleSubmit, register } = useForm<UserSignin>();
  const [err, setErr] = useState("");
  const [pass, setPass] = useState("");
  const [errPass, setErrPass] = useState<boolean>();

  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleErr = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  };
  const handleErrLogin = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You must log in",
    });
  };
  const onSubmit: SubmitHandler<UserSignin> = (data) => {
    setErr("");
    setErrPass(false);
    const formData = new FormData();
    if (data.password !== null && data.password !== "") {
      if (pass === data.password) {
        formData.append("password", data.password);
      } else {
        setErrPass(true);
      }
    }

    const entriesArray = Array.from(formData.entries());
    console.log(entriesArray);
    if (entriesArray.length !== 0) {
      submitFormData(formData)
        .unwrap()
        .then((fulfilled) => {
          localStorage.setItem(
            "emailUrlUserCareerup",
            fulfilled?.payload?.user?.email
          );
          handleSuccess();
        })
        .catch((rejected) => {
          console.log(rejected);
          if (rejected?.status == 401) {
            handleErrLogin();

            navigate("/login");
          } else if (rejected?.status == 500) {
            handleErr();
          } else if (rejected?.status == 400) {
            setErr(rejected.data.message);
          }
        });
    }
  };
  return (
    <>
      <div className="container py-[30px]">
        <div className=" min-h[68vh] border-2">
          <div className=" border-b-2 py-[10px] flex items-center justify-center gap-2 sm:gap-4 flex-col sm:flex-row">
            <div
              onClick={() => {
                navigate(
                  `/myprofile/${localStorage.getItem("idUserCareerup")}`
                );
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
            <div className=" cursor-pointer ">
              <h1 className=" text-text font-bold text-center text-[25px] tracking-[0.5px]">
                Private profile
              </h1>
              <p className=" text-text text-center tracking-[0.5px] font-medium text-[15px] px-[10px]">
                Edit your private information
              </p>
            </div>
          </div>
          <div className="py-[25px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="flex flex-col  w-[95%] sm:w-[80%] m-auto gap-2 pt-[30px]"
            >
              <input
                {...register("password")}
                type="password"
                placeholder="New password"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                value={pass}
                type="password"
                placeholder="Enter password again"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              {errPass && (
                <p className=" text-[17px] font-medium text-primary capitalize pt-[2px]">
                  Passwords do not match. Please try again.
                </p>
              )}
              {loadingSendData ? (
                <div className=" flex justify-start items-center">
                  <Hourglass
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#EC5252", "#ec525252"]}
                  />
                </div>
              ) : (
                <input
                  type="submit"
                  value="Save"
                  className=" h-[40px] w-[60px] flex justify-center items-center cursor-pointer bg-primary mt-[20px]"
                />
              )}

              {err && (
                <p className=" text-[20px] font-semibold text-primary capitalize pt-[10px]">
                  {err}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSecurity;
