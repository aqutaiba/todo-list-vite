import "./index.css";
import { useStore } from "./store";
import { Toaster } from "react-hot-toast";
import InputField from "./Components/InputField";
import TodoList from "./Components/TodoList";

function App() {
  const add = useStore((state) => state.add);
  return (
    <div className="App">
      <Toaster />
      <InputField submitButtonText="Submit" onActionExecute={add} />
      <TodoList />
    </div>
  );
}

export default App;
