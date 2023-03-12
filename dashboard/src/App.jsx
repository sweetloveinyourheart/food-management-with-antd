import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="*" Component={Dashboard} />
    </Routes>
  );
};
export default App;