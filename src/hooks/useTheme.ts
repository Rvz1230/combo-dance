import { useState, useEffect } from 'react';
import { storageService } from '../components/common/StorageService';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export function useTheme(): ThemeContextType {
  const [theme, setTheme] = useState<Theme>(() => {
    // 尝试从存储中获取主题，如果失败则使用系统偏好
    try {
      const savedTheme = storageService.get<Theme | null>('theme', null);
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.error('Failed to initialize theme:', error);
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  });

  useEffect(() => {
    try {
      // 更新DOM类
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      
      // 使用统一的存储服务保存主题
      storageService.set('theme', theme);
    } catch (error) {
      console.error('Failed to update theme:', error);
      // 即使存储失败也继续更新DOM
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
}
