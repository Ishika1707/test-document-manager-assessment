import {createApi, fetchBaseQuery, MutationDefinition} from "@reduxjs/toolkit/query/react";
export const fileService = createApi({
  reducerPath: "fileService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
  }),
  endpoints: (builder) => ({
      addFile: builder.mutation<any, void>({
          query: (body) => ({
            url: "/api/upload",
            method: "POST",
            body: body,
          }),
      }),
      Login: builder.mutation<any, void>({
          query: (data: any) => ({
              url: `/api/login`,
              method: "POST",
              body: data,
          }),
      }),
      getUserFiles: builder.query<any, void>({
          query: (userId) => ({
              url: `/api/file?userId=${userId}`,
              method: "GET",
          })
      }),
      deleteFile: builder.mutation<any, void>({
          query: (data: any) => ({
              url: `/api/file`,
              method: "DELETE",
              body: data,
          }),
      }),
      getFileByVersion: builder.mutation<any, void>({
          query: (data: any) => ({
              url: `/api/file-version`,
              method: "Post",
              body: data,
          }),
  }),
  }),
});

export const {
    useAddFileMutation,
    useLoginMutation,
    useGetUserFilesQuery,
    useDeleteFileMutation,
    useGetFileByVersionMutation
} = fileService;
