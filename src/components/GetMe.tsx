// import { useGetmeQuery } from "../store/apislice";
import { useNavigate } from "react-router-dom";
import { useGetmeQuery, useEditUserDataMutation } from "../store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";
import edit from "../assests/edit.svg";
import { useEffect, useState } from "react";
import { GetmeData, ServerResponse } from "../types/types.model";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";
const GetMe = () => {
  const navigate = useNavigate();
  const { data, isLoading: loadingGetme, error } = useGetmeQuery();
  console.log(data);
  const [submitFormData, { isLoading: loadingSendData }] =
    useEditUserDataMutation();
  const [err, setErr] = useState("");
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<GetmeData>();
  useEffect(() => {
    if (data) {
      setValue("fullname", data.payload.fullname);
      setValue("bio", data.payload.bio);
      setValue("job", data.payload.job);
      setValue("gender", data.payload.gender ? data.payload.gender : "");
      setValue("facebookUrl", data.payload.facebookUrl);
      setValue("twitterUrl", data.payload.twitterUrl);
      setValue("youtubeUrl", data.payload.youtubeUrl);
      setValue("linkedinUrl", data.payload.linkedinUrl);
    }
  }, [data]);
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
  const onSubmit: SubmitHandler<GetmeData> = (data) => {
    setErr("");

    const formData = new FormData();
    if (data.avatarUrl && data.avatarUrl.length > 0) {
      formData.append("avatar", data.avatarUrl[0]);
    }
    formData.append("fullname", data.fullname);
    const jobValue = data.job === null ? "" : data.job;
    formData.append("job", jobValue);

    const biowithoutspace = data.bio?.trim();
    const bioValue = biowithoutspace ?? "";
    formData.append("bio", bioValue as string);

    const facebookUrlValue = data.facebookUrl === null ? "" : data.facebookUrl;
    formData.append("facebookUrl", facebookUrlValue);

    const twitterValue = data.twitterUrl === null ? "" : data.twitterUrl;
    formData.append("twitterUrl", twitterValue);

    const youtubeValue = data.youtubeUrl === null ? "" : data.youtubeUrl;
    formData.append("youtubeUrl", youtubeValue);

    const linkedinValue = data.linkedinUrl === null ? "" : data.linkedinUrl;
    formData.append("linkedinUrl", linkedinValue);

    if (data.gender !== null && data.gender !== "") {
      formData.append("gender", data.gender);
    }
    const entriesArray = Array.from(formData.entries());
    console.log(entriesArray);
    if (entriesArray.length !== 0) {
      submitFormData(formData)
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
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
  if (loadingGetme) {
    return (
      <div className=" flex justify-center items-center">
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
    );
  }
  if (error && (error as ServerResponse)?.status === 401) {
    const serverError = error as ServerResponse;
    return (
      <>
        <p className=" font-extrabold text-[28px] text-center text-accent-1">
          {serverError.data.message}
        </p>
      </>
    );
  }
  return (
    <div className="container py-[30px]">
      <div className=" min-h-[68vh] border-2">
        <div className=" border-b-2 py-[10px] flex items-center justify-center gap-2 sm:gap-4 flex-col sm:flex-row">
          <div className=" cursor-pointer ">
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
              navigate("account-security");
            }}
            className=" cursor-pointer "
          >
            <h1 className=" text-text font-bold text-center text-[25px] tracking-[0.5px]">
              Private profile
            </h1>
            <p className=" text-text text-center tracking-[0.5px] font-medium text-[15px] px-[10px]">
              Edit your private information
            </p>
          </div>
        </div>
        <div className="py-[px]">
          <form onSubmit={handleSubmit(onSubmit)} action="" className="">
            <div>
              <div className="py-3 flex justify-center">
                <div className="relative flex justify-center items-center gap-3 w-fit">
                  <div className="  absolute bottom-[75%] left-[1%] w-[15px] outline-none border-none">
                    <input
                      {...register("avatarUrl")}
                      type="file"
                      id="file-input"
                      className=" outline-none border-none w-0"
                    />
                    <label
                      id="file-input-label"
                      htmlFor="file-input"
                      className=" text-[#F1F1F1]   cursor-pointer"
                    >
                      <img src={edit} alt="" />
                    </label>
                  </div>
                  <img
                    src={
                      watch("avatarUrl")?.[0]
                        ? URL.createObjectURL(watch("avatarUrl")?.[0])
                        : data?.payload.avatarUrl
                    }
                    alt=""
                    className=" object-contain w-[55px] rounded-full"
                  />
                  <div>
                    <h1 className=" text-[20px] font-bold text-primary">
                      {data?.payload.fullname}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-1 w-full border-b-2"></div>
            <div className="flex flex-col  w-[95%] sm:w-[80%] m-auto gap-2 py-5">
              <p className=" text-text text-[15px] font-semibold">Basics:</p>
              <input
                {...register("fullname", { required: "Name is required" })}
                type="text"
                placeholder="Fullname"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <textarea
                {...register("bio")}
                className="text-black pl-[10px] outline-none focus:border-b-2 focus:border-primary"
                placeholder="bio"
              ></textarea>
              <input
                {...register("job")}
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
                {...register("gender", { required: "gender is required" })}
                id="gender"
                className=" h-[30px] pl-[5px] outline-none focus:border-b-2"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <p className=" capitalize text-primary text-[17px] font-semibold">
                {errors.gender?.message}
              </p>
              <div className=" h-1 w-full border-b-2 mt-2"></div>
              <p className=" text-text text-[15px] font-semibold">Links:</p>
              <input
                {...register("facebookUrl")}
                type="text"
                placeholder="Facebook"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                {...register("twitterUrl")}
                type="text"
                placeholder="Twitter"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                {...register("youtubeUrl")}
                type="text"
                placeholder="Youtube"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
              <input
                {...register("linkedinUrl")}
                type="text"
                placeholder="Linkedin"
                className=" text-black h-[40px] pl-[10px] outline-none focus:border-b-2 focus:border-primary "
              />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetMe;
