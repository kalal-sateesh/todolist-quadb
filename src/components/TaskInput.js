import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../slices/TodoListSlice";

const TaskInput = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  /* Adding the Task to redux state. */
  const handleAddTodo = () => {
    if (title.trim()) {
      dispatch(addTask({ title: title, isDone: false }));
      setTitle("");
      setTimeout(() => {
        alert("Task Added..");
      }, 300);
    } else {
      alert("Title Required..!");
    }
  };
  /* Adding the Task to redux state. */

  return (
    <div className="w[100%] h-[100px] mt-[80px] flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3">
      <input
        className="w-[300px] h-[40px] outline-none rounded-lg pl-5 pr-5 placeholder:text-black bg-slate-300"
        type="text"
        placeholder="Add Title here"
        onChange={(e) => setTitle(e.target.value)}
        required
        value={title}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
      />
      <button
        className="bg-black text-white pl-5 pr-5 pt-2 pb-2 hover:bg-cyan-600 rounded-lg"
        onClick={handleAddTodo}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
