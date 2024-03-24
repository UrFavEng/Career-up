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
  GetCourseRes,
  UpdataCourseRes,
  getCoursesByCatsRes,
  SearchCoursesRES,
  AddFavRES,
  addNewSec,
  addNewSecRes,
  DeleteSectionResponse,
  DeleteSec,
  UpdateSecResponse,
  SectionUpdateRES,
} from "../types/types.model";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-learning-5rhj.onrender.com/api/v1/",
    credentials: "include",
  }),
  tagTypes: ["user", "TeachingCourse"],

  endpoints: (builder) => ({
    signUp: builder.mutation<CreateUserResponse, UserSignUP>({
      query: (body) => ({
        url: "users/createNewUser",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user", "TeachingCourse"],
    }),
    beInstructor: builder.mutation<UpgradeResponsebeInstructor, void>({
      query: () => ({ url: "users/becomeInstructor", method: "PUT" }),
      invalidatesTags: ["user"],
    }),
    signin: builder.mutation<CreateUserResponse, UserSignin>({
      query: (body) => ({ url: "users/login", method: "POST", body }),
      invalidatesTags: ["user", "TeachingCourse"],
    }),
    logOut: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      invalidatesTags: ["user", "TeachingCourse"],
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
    getCourseByid: builder.query<GetCourseRes, string | undefined>({
      query: (id) => `courses/getCourseById/${id}`,
      providesTags: ["TeachingCourse"],
    }),
    editCourseData: builder.mutation<
      UpdataCourseRes,
      { formData: FormData; id: string | number | undefined }
    >({
      query: ({ formData, id }) => ({
        url: `/courses/updateCourse/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["TeachingCourse"],
    }),
    getCoursesByCat: builder.query<getCoursesByCatsRes, string | undefined>({
      query: (id) => `courses/getCoursesByCategory/${id}`,
    }),
    getCoursesSearch: builder.query<SearchCoursesRES, string | undefined>({
      query: (name) => `courses/searchCourses?q=${name}`,
    }),
    addFav: builder.mutation<AddFavRES, { body: { courseId: number } }>({
      query: ({ body }) => ({
        url: `favorites/addFavorite`,
        method: "POST",
        body,
      }),
    }),
    deleteFav: builder.mutation<string, string>({
      query: (id) => ({
        url: `favorites/addFavorite/${id}`,
        method: "DELETE",
      }),
    }),
    addNewSec: builder.mutation<addNewSecRes, addNewSec>({
      query: (body) => ({
        url: `sections/addSection`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TeachingCourse"],
    }),
    deleteSec: builder.mutation<DeleteSectionResponse, DeleteSec>({
      query: (dataDelete) => ({
        url: `/sections/deleteSection/${dataDelete.id}`,
        method: "DELETE",
        body: { courseId: dataDelete.courseId },
      }),
      invalidatesTags: ["TeachingCourse"],
    }),
    editNewSec: builder.mutation<
      UpdateSecResponse,
      { body: SectionUpdateRES; id: string | number | undefined }
    >({
      query: ({ body, id }) => ({
        url: `/sections/updateSection/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["TeachingCourse"],
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
  useGetCourseByidQuery,
  useEditCourseDataMutation,
  useGetCoursesByCatQuery,
  useGetCoursesSearchQuery,
  useAddFavMutation,
  useDeleteFavMutation,
  useAddNewSecMutation,
  useDeleteSecMutation,
  useEditNewSecMutation,
} = apiSlice;
