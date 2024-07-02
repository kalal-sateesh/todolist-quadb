import "./App.css";
import AppHeader from "./components/AppHeader";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <AppHeader />
      <TaskInput />
      <TaskList />
    </>
  );
}

export default App;
