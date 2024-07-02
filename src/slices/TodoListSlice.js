import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* Get Data from local storege if available else asigning an empty array. */

  data: JSON.parse(localStorage.getItem("data")) || [],
  isEdit: false,
  id: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const TaskListSlice = createSlice({
  name: "TodoList",
  initialState,
  reducers: {
    /* Adding the Task to the redux state and updating the state and sending data to the localstorage. */

    addTask: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("data", JSON.stringify(state.data));
    },

    /* Deleting the Task updating the state and sending updated data to the localstorage. */
    DeleteTask: (state, action) => {
      state.data.splice(action.payload, 1);
      localStorage.setItem("data", JSON.stringify(state.data));
    },

    /* Updating  the Task to completed state the sending updated data to the localstorage. */
    CompleteTask: (state, action) => {
      state.data[action.payload].isDone = true;
      localStorage.setItem("data", JSON.stringify(state.data));
    },

    /* Updating isEdit state. */
    EditTask: (state, action) => {
      state.isEdit = true;
      state.id = action.payload;
    },

    /* Updating the Task the and sending updated data to the localstorage. */

    UpdateTask: (state, action) => {
      state.data[action.payload.id].title = action.payload.title;
      state.isEdit = false;
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    /* Updating isEdit state after saving. */
    EditTaskfalse: (state) => {
      state.isEdit = false;
    },
  },
});

export const {
  addTask,
  DeleteTask,
  CompleteTask,
  EditTask,
  UpdateTask,
  EditTaskfalse,
} = TaskListSlice.actions;

export default TaskListSlice.reducer;
