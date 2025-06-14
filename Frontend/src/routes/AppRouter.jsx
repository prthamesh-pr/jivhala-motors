import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import VehicleDetails from "../pages/VehicleDetails";
import { useAuth } from "../context/AuthContext";
import VehicleOut from "../pages/VehicleOut";
import Profile from "../pages/Profile";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/vehicle/:id"
          element={isAuthenticated ? <VehicleDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/buyers/out/:id"
          element={isAuthenticated ? <VehicleOut /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
