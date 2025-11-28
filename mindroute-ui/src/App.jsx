import "./App.css";
import Todo from "./components/todo";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Todo />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </Provider>
    </>
  );
}

export default App;
