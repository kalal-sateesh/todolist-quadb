import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/TodoListSlice";

export const store = configureStore({
  reducer: {
    TodoList: todoReducer,
  },
});
