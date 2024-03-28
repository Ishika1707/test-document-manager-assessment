import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fileService } from "../services/service";

export const store = configureStore({
    reducer: {
        [fileService.reducerPath]: fileService.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            fileService.middleware
        ),
});

setupListeners(store.dispatch);

export default store;
