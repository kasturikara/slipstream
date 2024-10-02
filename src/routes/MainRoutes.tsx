import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import AddPages from "../pages/add";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/add" element={<AddPages />} />
    </Routes>
  );
}

export default MainRoutes;
