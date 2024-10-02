import { useState } from "react";
import LoginPages from "./pages/auth";
import MainRoutes from "./routes/MainRoutes";
import MainLayout from "./layout/MainLayout";

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user"));

  return isLogin ? (
    <MainLayout>
      <MainRoutes />
    </MainLayout>
  ) : (
    <LoginPages setIsLogin={setIsLogin} />
  );
}

export default App;
