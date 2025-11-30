import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from './hooks/useTheme';

// 增强的应用组件
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const { theme } = useTheme();

  // 处理用户登出
  const logout = () => {
    setIsAuthenticated(false);
  };

  // 处理用户登录
  const login = (username: string, password: string) => {
    // 实际项目中这里应该有真实的认证逻辑
    if (username && password) {
      setIsAuthenticated(true);
      setLastActivityTime(Date.now());
      return true;
    }
    return false;
  };

  // 监听用户活动，更新最后活动时间
  const handleUserActivity = () => {
    setLastActivityTime(Date.now());
  };

  // 组件挂载时添加事件监听器
  useEffect(() => {
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  // 确保主题类应用到body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        logout,
        login,
        lastActivityTime 
      }}
    >
      <div className={`min-h-screen w-full ${theme}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
