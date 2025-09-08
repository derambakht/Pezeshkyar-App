import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaStop, FaUser, FaPills, FaChartLine, FaStethoscope, FaCalendarAlt, FaSearch, FaBell, FaCog, FaHeart, FaUserMd, FaPlus } from "react-icons/fa";
import { MdHealthAndSafety, MdLocalHospital } from "react-icons/md";
import MicrophoneButton from "./MicrophoneButton";
import PatientSearch from "./PatientSearch";
import HealthStatusCard from "./HealthStatusCard";
import EnvironmentCard from "./EnvironmentCard";
import NotificationPanel from "./NotificationPanel";
import StatChart from "./StatChart";
import QuickSettings from "./QuickSettings";
import LoadingSpinner from "./LoadingSpinner";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting("صبح بخیر");
    else if (hour < 17) setGreeting("ظهر بخیر");
    else setGreeting("عصر بخیر");
  }, [currentTime]);

  const handleMicClick = () => {
    setIsRecording((prev) => !prev);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setChatHistory((prev) => [
        ...prev,
        { text: inputValue, sender: "user", timestamp: new Date() }
      ]);
      setInputValue("");
      
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { text: "پاسخ دستیار هوشمند پزشکیار", sender: "assistant", timestamp: new Date() }
        ]);
      }, 800);
    }
  };

  const quickActions = [
    { id: "patients", icon: FaUser, title: "بیماران", color: "from-blue-500 to-blue-600" },
    { id: "drugs", icon: FaPills, title: "داروها", color: "from-green-500 to-green-600" },
    { id: "appointments", icon: FaCalendarAlt, title: "نوبت‌ها", color: "from-purple-500 to-purple-600" },
    { id: "reports", icon: FaChartLine, title: "گزارشات", color: "from-orange-500 to-orange-600" },
  ];

  const recentActivities = [
    { id: 1, action: "ویزیت بیمار", patient: "احمد محمدی", time: "10 دقیقه پیش", icon: FaStethoscope },
    { id: 2, action: "تجویز دارو", patient: "مریم احمدی", time: "30 دقیقه پیش", icon: FaPills },
    { id: 3, action: "بررسی آزمایش", patient: "علی رضایی", time: "1 ساعت پیش", icon: FaChartLine },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-x-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-10 sm:block hidden"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-10 sm:block hidden"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-4 md:p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <MdHealthAndSafety className="text-white text-2xl" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                پزشکیار
              </h1>
              <p className="text-sm text-gray-500">دستیار هوشمند پزشکی</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-md"
            >
              <FaBell className="text-gray-600" />
            </motion.button>
            <QuickSettings />
          </div>
        </div>

        {/* Greeting and Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {greeting} دکتر عزیز
          </h2>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleDateString('fa-IR')} - {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-3 sm:px-4 md:px-6 max-w-full overflow-x-hidden">
        {/* Voice Assistant Section */}
        <motion.section
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl mx-auto max-w-full">
            <div className="text-center mb-6">
              <motion.div
                animate={{
                  boxShadow: isRecording
                    ? ["0 0 0 0 rgba(255,255,255,0.4)", "0 0 0 20px rgba(255,255,255,0.1)", "0 0 0 0 rgba(255,255,255,0.4)"]
                    : "0 0 0 0 rgba(255,255,255,0.1)",
                }}
                transition={{
                  duration: 1.5,
                  repeat: isRecording ? Infinity : 0,
                }}
                className="inline-block rounded-full p-2 mb-4"
              >
                <MicrophoneButton isRecording={isRecording} onClick={handleMicClick} />
              </motion.div>
              
              <h3 className="text-lg sm:text-xl font-bold mb-2">دستیار صوتی پزشکیار</h3>
              <p className="text-blue-100 text-sm">
                {isRecording ? "در حال گوش دادن..." : "برای شروع گفتگو کلیک کنید"}
              </p>
            </div>

            {/* Text Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="سوال خود را بپرسید..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white rounded-lg px-3 sm:px-4 py-2 font-bold hover:bg-white/30 transition backdrop-blur-sm text-sm"
                onClick={handleSend}
              >
                ارسال
              </motion.button>
            </div>
          </Card>
        </motion.section>

        {/* Health Status Cards */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <HealthStatusCard />
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">دسترسی سریع</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className={`p-3 sm:p-4 bg-gradient-to-r ${action.color} text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="text-center">
                    <action.icon className="text-xl sm:text-2xl mb-2 sm:mb-3 mx-auto" />
                    <p className="font-semibold text-xs sm:text-sm">{action.title}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Chat History */}
        <AnimatePresence>
          {chatHistory.length > 0 && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">تاریخچه گفتگو</h3>
              <Card className="p-4 max-h-64 overflow-y-auto space-y-3">
                {chatHistory.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl break-words ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp?.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Environment Status */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <EnvironmentCard />
        </motion.section>

        {/* Recent Activities */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">فعالیت‌های اخیر</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="text-white text-xs sm:text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{activity.patient}</p>
                    </div>
                    <p className="text-xs text-gray-400 flex-shrink-0">{activity.time}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-8"
        >
          <Card className="p-6">
            <NotificationPanel />
          </Card>
        </motion.section>

        {/* Analytics Chart */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-8"
        >
          <StatChart />
        </motion.section>

        {/* Statistics Cards */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">آمار امروز</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Card className="p-3 sm:p-4 bg-gradient-to-r from-green-400 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">24</p>
                  <p className="text-xs sm:text-sm opacity-80">بیمار ویزیت شده</p>
                </div>
                <FaUserMd className="text-2xl sm:text-3xl opacity-60" />
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">12</p>
                  <p className="text-xs sm:text-sm opacity-80">نوبت باقی‌مانده</p>
                </div>
                <FaCalendarAlt className="text-2xl sm:text-3xl opacity-60" />
              </div>
            </Card>
            
            <Card className="p-3 sm:p-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">98%</p>
                  <p className="text-xs sm:text-sm opacity-80">رضایت بیماران</p>
                </div>
                <FaHeart className="text-2xl sm:text-3xl opacity-60" />
              </div>
            </Card>
          </div>
        </motion.section>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        <FaPlus className="text-white text-xl" />
      </motion.button>

      {/* Patient Search (Bottom Sheet Style) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 sm:p-4 z-40 safe-area-bottom"
      >
        <PatientSearch />
      </motion.div>
    </div>
  );
};

export default Dashboard;
