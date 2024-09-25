import { useState } from "react";
import LoginPages from "./pages/auth";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return !isLogin ? <LoginPages /> : <div>sudah login</div>;
}

export default App;
