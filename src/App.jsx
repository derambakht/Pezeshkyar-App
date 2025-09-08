
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./components/Dashboard";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
