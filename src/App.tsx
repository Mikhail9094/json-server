import { ToastContainer } from "react-toastify";
import SeminarList from "./components/SeminarList";

function App() {
  return (
    <div>
      <SeminarList />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
