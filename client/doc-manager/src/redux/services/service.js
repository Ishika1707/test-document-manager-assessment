import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const fileService = createApi({
  reducerPath: "fileService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
  }),
  endpoints: (builder) => ({
    addFile: builder.mutation({
      query: (body) => ({
        url: "/api/upload",
        method: "POST",
        body: body,
      }),
    })
  }),
});

export const {
  useAddFileMutation
} = fileService;
