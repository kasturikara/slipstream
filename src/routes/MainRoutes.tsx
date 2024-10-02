import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import AddPages from "../pages/add";
import ProfilePages from "../pages/profile";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/add" element={<AddPages />} />
      <Route path="/profile" element={<ProfilePages />} />
    </Routes>
  );
}

export default MainRoutes;
