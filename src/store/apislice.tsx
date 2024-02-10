import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesResponse,
  CreateUserResponse,
  GetUserResponse,
  LogoutResponse,
  UserSignUP,
  UserSignin,
  getHome,
  UpgradeResponsebeInstructor,
  AddCoursereq,
  AddCourseres,
  teacingCoursesRes,
} from "../types/types.model";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-learning-5rhj.onrender.com/api/v1/",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":
        "https://playful-medovik-ce857d.netlify.app",
    },
  }),
  tagTypes: ["user", "TeachingCourse"],

  endpoints: (builder) => ({
    signUp: builder.mutation<CreateUserResponse, UserSignUP>({
      query: (body) => ({
        url: "users/createNewUser",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    beInstructor: builder.mutation<UpgradeResponsebeInstructor, void>({
      query: () => ({ url: "users/becomeInstructor", method: "PUT" }),
      invalidatesTags: ["user"],
    }),
    signin: builder.mutation<CreateUserResponse, UserSignin>({
      query: (body) => ({ url: "users/login", method: "POST", body }),
      invalidatesTags: ["user"],
    }),
    logOut: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    AddCourse: builder.mutation<AddCourseres, AddCoursereq>({
      query: (body) => ({
        url: "courses/addCourse",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeachingCourse"],
    }),
    getme: builder.query<GetUserResponse, void>({
      query: () => `users/getMe`,
      providesTags: ["user"],
    }),
    teachingCourses: builder.query<teacingCoursesRes, void>({
      query: () => `/courses/teachingCourses`,
      providesTags: ["TeachingCourse"],
    }),
    editUserData: builder.mutation<CreateUserResponse, FormData>({
      query: (body) => ({
        url: "users/editUserData",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getAllCats: builder.query<CategoriesResponse, void>({
      query: () => `/categories/getAllCategories`,
    }),
    getHome: builder.query<getHome, void>({
      query: () => `/courses/home`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpMutation,
  useSigninMutation,
  useLogOutMutation,
  useGetmeQuery,
  useEditUserDataMutation,
  useGetAllCatsQuery,
  useGetHomeQuery,
  useBeInstructorMutation,
  useAddCourseMutation,
  useTeachingCoursesQuery,
} = apiSlice;
