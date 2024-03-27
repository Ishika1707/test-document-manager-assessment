import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { fileService } from "../services/service";

export const store = configureStore({
  reducer: {
    [fileService.reducerPath]: fileService.reducer,
  }
});

setupListeners(store.dispatch);

export default store;
