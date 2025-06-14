import React from "react";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <AppRouter />
      </div>
    </AuthProvider>
  );
};

export default App;
