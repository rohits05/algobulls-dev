import React from "react";
import { AuthProvider } from "./context/AuthContext";
import UserPreview from "./pages/UserPreview";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <UserPreview />
      </div>
    </AuthProvider>
  );
};

export default App;
