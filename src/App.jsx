
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./components/Dashboard";
import SplashScreen from "./components/SplashScreen";
import ThemeProvider from "./contexts/ThemeContext";
import "./App.css";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      <div className="app bg-theme-primary min-h-screen transition-colors duration-300">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" onComplete={handleSplashComplete} />
          ) : (
            <Dashboard key="dashboard" />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
