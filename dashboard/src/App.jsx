import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="*" Component={Dashboard} />
      <Route path="/login" Component={LoginPage} />
    </Routes> 
  );
};
export default App;