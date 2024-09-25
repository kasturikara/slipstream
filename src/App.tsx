import { useState } from "react";
import LoginPages from "./pages/auth";
import MainRoutes from "./routes/MainRoutes";

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user"));

  return isLogin ? <MainRoutes /> : <LoginPages setIsLogin={setIsLogin} />;
}

export default App;
