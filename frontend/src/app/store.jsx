import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import questionsReducer from "../features/questionsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionsReducer,
  },
});
