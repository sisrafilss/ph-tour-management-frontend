import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "basApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
