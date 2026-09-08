import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
=======
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
>>>>>>> 22d413f2da17c160461b913be22174c3ec24403c

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;