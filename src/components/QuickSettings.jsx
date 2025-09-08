import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCog, FaBell, FaSignOutAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const QuickSettings = () => {
  const { isDark } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "دکتر احمد محمدی",
    specialty: "متخصص قلب و عروق",
    clinicName: "مطب تخصصی قلب",
    workingHours: "8:00 - 18:00"
  });

  const [editingInfo, setEditingInfo] = useState({ ...doctorInfo });

  const handleSave = () => {
    setDoctorInfo({ ...editingInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingInfo({ ...doctorInfo });
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
      >
        <FaUser className="text-white text-sm" />
      </motion.button>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute left-0 mt-2 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">پروفایل دکتر</h3>
                  <div className="flex space-x-2 space-x-reverse">
                    {!isEditing ? (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsEditing(true)}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        <FaEdit className="text-sm" />
                      </motion.button>
                    ) : (
                      <div className="flex space-x-1 space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleSave}
                          className="p-1 hover:bg-green-500/20 rounded"
                        >
                          <FaSave className="text-sm" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCancel}
                          className="p-1 hover:bg-red-500/20 rounded"
                        >
                          <FaTimes className="text-sm" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg ml-3">
                    {doctorInfo.name.split(' ')[1]?.charAt(0) || 'د'}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingInfo.name}
                        onChange={(e) => setEditingInfo({ ...editingInfo, name: e.target.value })}
                        className="w-full font-semibold text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none pb-1 mb-1"
                      />
                    ) : (
                      <h4 className="font-semibold text-gray-800">{doctorInfo.name}</h4>
                    )}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingInfo.specialty}
                        onChange={(e) => setEditingInfo({ ...editingInfo, specialty: e.target.value })}
                        className="w-full text-sm text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none pb-1"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{doctorInfo.specialty}</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">نام مطب</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingInfo.clinicName}
                        onChange={(e) => setEditingInfo({ ...editingInfo, clinicName: e.target.value })}
                        className="w-full text-sm text-gray-800 border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <p className="text-sm text-gray-800">{doctorInfo.clinicName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">ساعات کاری</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingInfo.workingHours}
                        onChange={(e) => setEditingInfo({ ...editingInfo, workingHours: e.target.value })}
                        className="w-full text-sm text-gray-800 border border-gray-300 rounded px-2 py-1 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <p className="text-sm text-gray-800">{doctorInfo.workingHours}</p>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                {!isEditing && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="w-full flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-lg transition-colors text-right"
                    >
                      <FaCog className="text-gray-500" />
                      <span className="text-sm text-gray-700">تنظیمات</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="w-full flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-lg transition-colors text-right"
                    >
                      <FaBell className="text-gray-500" />
                      <span className="text-sm text-gray-700">اعلان‌ها</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="w-full flex items-center space-x-3 space-x-reverse p-3 hover:bg-red-50 rounded-lg transition-colors text-right"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      <span className="text-sm text-red-600">خروج از حساب</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickSettings;
