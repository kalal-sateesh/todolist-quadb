import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleteTask,
  DeleteTask,
  EditTask,
  EditTaskfalse,
  UpdateTask,
} from "../slices/TodoListSlice";

const TaskList = () => {
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  /* Extracting the data from redux state. */
  const { data, isEdit, id } = useSelector((state) => state.TodoList);
  /* Extracting the data from redux state. */

  /* Deleting the Task. */
  const handleDeleteTask = (index) => {
    dispatch(DeleteTask(index));
    setTimeout(() => {
      alert("Task Deleted..");
    }, 300);
  };
  /* Deleting the Task. */

  /* Updating the state to view and hide the tasks. */
  const handleViewTask = () => {
    setIsShow(!isShow);
  };
  /* Updating the state to view and hide the tasks. */

  /*  Updating the Completed state.  */
  const handleDone = (index) => {
    dispatch(CompleteTask(index));
  };
  /*  Updating the Completed state.  */

  /*  Editing the Task.  */
  const handleEditTask = (index) => {
    dispatch(EditTask(index));
  };
  /*  Editing the Task.  */

  /*  Saving the Edited Task.  */
  const handleSaveTask = () => {
    if (title.trim()) {
      dispatch(UpdateTask({ title: title, id: id }));
      setTitle("");
      dispatch(EditTaskfalse());
      setTimeout(() => {
        alert("Task Updated Successfully..!");
      }, 300);
    } else {
      alert("Title Required..!");
    }
  };
  /*  Saving the Edited Task.  */

  /*  Canceling the Task.  */
  const handleCancel = () => {
    dispatch(EditTaskfalse());
  };
  /*  Canceling the Task.  */


  /* Mapping data and showing in list format */
  const list = data.map((ele, index) => {
    return (
      <div
        className={
          ele?.isDone
            ? "lg:w-[50%] md:w-[70%] bg-green-700 w-[90%] h-[100px] border-2 border-gray-400 rounded-md flex flex-col sm:flex-row items-center m-auto mt-3 mb-3"
            : "lg:w-[50%] md:w-[70%] bg-gray-700 w-[90%] h-[100px] border-2 border-gray-400 rounded-md flex flex-col sm:flex-row items-center m-auto mt-3 mb-3"
        }
        key={index}
      >
        <div className="w-[100%] text-white sm:w-[50%] h-[50%] sm:h-[100%] p-3 box-border flex items-center sm:justify-start justify-center overflow-hidden">
          <span className="text-lg font-bold">Title :</span>
          <span className="ml-2">{ele?.title}</span>
        </div>
        <div className="w-[100%] sm:w-[50%] h-[50%] sm:h-[100%] flex justify-evenly items-center">
          <button
            className="pl-3 pr-3 pt-1 pb-1 bg-yellow-500 rounded-md text-white hover:bg-white hover:text-yellow-500"
            onClick={() => handleEditTask(index)}
          >
            Edit
          </button>

          <button
            className="pl-3 pr-3 pt-1 pb-1 bg-red-500 rounded-md text-white hover:bg-white hover:text-red-500"
            onClick={() => handleDeleteTask(index)}
          >
            Delete
          </button>

          <button
            className={
              ele?.isDone
                ? "pl-3 pr-3 pt-1 pb-1 bg-black rounded-md text-white"
                : "pl-3 pr-3 pt-1 pb-1 bg-green-500 rounded-md text-white hover:bg-white hover:text-red-500"
            }
            onClick={() => handleDone(index)}
            disabled={ele?.isDone ? true : false}
          >
            {ele?.isDone ? "Completed" : "Done"}
          </button>
        </div>
      </div>
    );
  });
 /* Mapping data and showing in list format */

  /* Updating State if is Edit true*/
  useEffect(() => {
    if (isEdit) {
      setTitle(data[id].title);
    }
  }, [isEdit, data, id]);
  /* Updating State if is Edit true*/


  
  return (
    <>
      <div className="w-[100%] h-[50px] flex justify-center items-center">
        <button
          className="pl-4 pr-4 pt-3 pb-3 bg-blue-500 rounded-md text-white hover:bg-white hover:text-blue-500"
          onClick={handleViewTask}
        >
          {isShow ? "Hide Tasks" : "View Tasks"}
        </button>
      </div>
      {isShow && (
        <div className="w-[100%] h-[350px] overflow-auto mt-5">{list}</div>
      )}
      {isEdit && (
        <div className="w-[300px] h-[250px] bg-teal-700 rounded-lg absolute top-60 md:left-[40%] left-[10%] z-50">
          <div className="flex justify-end w-[90%] m-auto pl-1 pr-1 pt-2 pb-2 h-auto">
            <span
              className="text-5xl text-gray-700 cursor-pointer hover:text-red-500"
              onClick={handleCancel}
            >
              &times;
            </span>
          </div>
          <div className="w-[250px] h-[80px] m-auto flex flex-col items-center justify-center">
            <input
              className="w-full h-[40px] outline-none rounded-lg pl-5 pr-5 placeholder:text-black bg-slate-300"
              type="text"
              placeholder="Add Title here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="w-[250px] h-auto m-auto text-center mt-8">
            <button
              className="bg-black text-white pl-5 pr-5 pt-2 pb-2 hover:bg-cyan-600 rounded-lg w-[150px] h-[50px]"
              onClick={handleSaveTask}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
