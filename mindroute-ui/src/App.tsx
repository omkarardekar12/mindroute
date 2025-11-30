import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Todo from "./components/Todo.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Todo />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </Provider>
    </>
  );
}

export default App;
