import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ApiResponse {
  data: {
    error: boolean;
    message: string;
    payload: object;
  };
}
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-learning-5rhj.onrender.com/api/v1/",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "users/createNewUser",
        method: "POST",
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({ url: "users/login", method: "POST", body }),
    }),
    logOut: builder.mutation<ApiResponse[], void>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    getme: builder.query<string[], void>({
      query: () => `users/getMe`,
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
} = apiSlice;
