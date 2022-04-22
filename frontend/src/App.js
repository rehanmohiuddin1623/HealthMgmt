import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProtectedRoute from "./ProtectedRoute";
import { Doctor as AdminDoctor } from "./pages/Home/Doctor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctor"
        element={
          <ProtectedRoute>
            <AdminDoctor />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
