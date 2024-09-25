import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}

export default MainRoutes;
