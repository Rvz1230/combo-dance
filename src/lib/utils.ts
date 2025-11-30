import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.apply(context, args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 从localStorage读取数据 - 已废弃，请使用storageService
export function readFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error(`Failed to read from localStorage for key ${key}:`, error);
  }
  return defaultValue;
}

// 写入数据到localStorage - 已废弃，请使用storageService
export function writeToLocalStorage(key: string, data: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Failed to write to localStorage for key ${key}:`, error);
    return false;
  }
}

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

// 验证颜色字符串
export function isValidColor(color: string): boolean {
  // 支持十六进制颜色代码和RGB颜色
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbColorRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
  const rgbaColorRegex = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
  
  return hexColorRegex.test(color) || rgbColorRegex.test(color) || rgbaColorRegex.test(color);
}

// 颜色转换：hex到rgb
export function hexToRgb(hex: string): [number, number, number] | null {
  // 移除#号
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// 深拷贝对象
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  
  const clonedObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

// 合并配置对象（深度合并）
export function mergeConfigs<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null && 
          typeof result[key] === 'object' && result[key] !== null) {
        result[key] = mergeConfigs(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

// 验证音频文件格式
export function isValidAudioFile(file: File): boolean {
  const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'];
  return validTypes.includes(file.type);
}

// 音频文件大小限制 (5MB)
export const MAX_AUDIO_SIZE = 5 * 1024 * 1024;

// 验证音频文件大小
export function isAudioFileSizeValid(file: File): boolean {
  return file.size <= MAX_AUDIO_SIZE;
}

// 播放音效函数
export function playSound(
  audioData?: string, 
  volume: number = 0.7, 
  pitch: number = 1, 
  delay: number = 0,
  playbackRate: number = 1
): HTMLAudioElement | null {
  if (!audioData) return null;
  
  try {
    const audio = new Audio(audioData);
    audio.volume = volume;
    audio.playbackRate = playbackRate * pitch;
    
    // 设置延迟播放
    setTimeout(() => {
      audio.play().catch(error => {
        console.error('Failed to play sound:', error);
      });
    }, delay);
    
    return audio;
  } catch (error) {
    console.error('Error creating audio element:', error);
    return null;
  }
}

// 停止播放音效
export function stopSound(audio: HTMLAudioElement | null): void {
  if (audio) {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (error) {
      console.error('Failed to stop sound:', error);
    }
  }
}
