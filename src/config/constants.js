// کانستانت‌های پروژه پزشکیار
export const APP_CONFIG = {
  name: "پزشکیار",
  version: "1.0.0",
  description: "دستیار هوشمند پزشکی",
  author: "تیم توسعه پزشکیار"
};

// تنظیمات انیمیشن
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
  },
  easing: {
    smooth: "easeInOut",
    bounce: "easeOut",
    spring: "spring"
  }
};

// رنگ‌های پروژه
export const COLORS = {
  primary: {
    blue: "#3B82F6",
    purple: "#8B5CF6",
    gradient: "from-blue-500 to-purple-600"
  },
  secondary: {
    green: "#10B981",
    yellow: "#F59E0B",
    red: "#EF4444"
  },
  neutral: {
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray500: "#6B7280",
    gray800: "#1F2937"
  }
};

// تنظیمات واکنشگرا
export const BREAKPOINTS = {
  mobile: "640px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px"
};

// پیام‌های کاربری
export const MESSAGES = {
  welcome: {
    morning: "صبح بخیر",
    afternoon: "ظهر بخیر", 
    evening: "عصر بخیر"
  },
  voice: {
    listening: "در حال گوش دادن...",
    clickToRecord: "برای ضبط صدا کلیک کنید",
    processing: "در حال پردازش..."
  },
  notifications: {
    success: "عملیات با موفقیت انجام شد",
    error: "خطایی رخ داده است",
    warning: "هشدار"
  }
};

// تنظیمات پیش‌فرض
export const DEFAULT_SETTINGS = {
  theme: "light",
  language: "fa",
  notifications: true,
  autoSave: true,
  voiceEnabled: true
};
