import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "ویزیت موفق",
      message: "بیمار احمد محمدی با موفقیت ویزیت شد",
      time: "5 دقیقه پیش",
      icon: FaCheckCircle,
      color: "from-green-400 to-green-600"
    },
    {
      id: 2,
      type: "warning",
      title: "یادآوری نوبت",
      message: "نوبت بعدی در 15 دقیقه آینده",
      time: "الان",
      icon: FaExclamationTriangle,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: 3,
      type: "info",
      title: "آپدیت سیستم",
      message: "نسخه جدید سیستم آماده است",
      time: "1 ساعت پیش",
      icon: FaInfoCircle,
      color: "from-blue-400 to-blue-600"
    }
  ]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  if (notifications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-gray-400"
      >
        <FaBell className="text-4xl mx-auto mb-2 opacity-50" />
        <p>هیچ اعلان جدیدی وجود ندارد</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <FaBell className="ml-2 text-blue-500" />
        اعلان‌های اخیر
        <span className="mr-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notifications.length}
        </span>
      </h3>
      
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-gradient-to-r ${notification.color} rounded-xl p-4 text-white overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-start space-x-3 space-x-reverse flex-1">
                <div className="p-2 bg-white/20 rounded-full">
                  <notification.icon className="text-lg" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{notification.title}</h4>
                  <p className="text-sm opacity-90 mb-2">{notification.message}</p>
                  <p className="text-xs opacity-70">{notification.time}</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeNotification(notification.id)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes className="text-sm" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationPanel;
