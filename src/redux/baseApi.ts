import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "basApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["USER", "TOUR"],
});

// baseQuery: fetchBaseQuery({
//   baseUrl: config.baseUrl,
//   credentials: "include", // do it for saving access token in the cookie of the browser for base API
// }),
