import { useState, useEffect } from 'react';
import { MouseConfig, HoverEffect, ClickEffect, TrailEffect, CursorVisibility, PointerEvents, DoubleClickBehavior, FloatingTextAnimation } from '../types/plugin';
import { mergeConfigs, deepClone, readFromLocalStorage } from '../lib/utils';
import { storageService } from '../components/common/StorageService';

// 预设方案定义
export const presetDefinitions: Record<string, Partial<MouseConfig>> = {
  default: {
    size: 20,
    color: '#000000',
    opacity: 1,
    borderWidth: 0,
    borderRadius: 0,
    shape: 'circle',
    cursorType: 'default'
  },
  "creative-mouse": {
    size: 42,
    color: '#4caf50',
    opacity: 1,
    borderWidth: 0,
    borderRadius: 50,
    shape: 'circle',
    cursorType: 'creative-mouse',
    shadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowSize: 8,
    shadowBlur: 12,
    magneticCursorEnabled: true,
    magneticStrength: 0.4,
    magneticDistance: 120,
    magneticAnimationDuration: 0.2
  },
  minimal: {
    size: 15,
    color: '#3b82f6',
    opacity: 0.8,
    borderWidth: 0,
    borderRadius: 50,
    shape: 'circle',
    shadow: true,
    shadowColor: '#3b82f633',
    cursorType: 'pointer'
  },
  colorful: {
    size: 25,
    color: '#ec4899',
    opacity: 1,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    borderRadius: 50,
    shape: 'circle',
    shadow: true,
    shadowSize: 12,
    shadowBlur: 8,
    hoverEffect: 'pulse' as HoverEffect,
    hoverEffectIntensity: 1.3,
    cursorType: 'pointer'
  },
  geometric: {
    size: 22,
    color: '#10b981',
    opacity: 0.9,
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 0,
    shape: 'square',
    cursorType: 'crosshair'
  },
  gaming: {
    size: 28,
    color: '#f97316',
    opacity: 1,
    borderWidth: 2,
    borderColor: '#ea580c',
    borderRadius: 8,
    shape: 'rounded-square',
    shadow: true,
    shadowSize: 15,
    shadowBlur: 10,
    shadowColor: '#f9731680',
    clickEffect: 'bounce' as ClickEffect,
    trailEffect: 'comet' as TrailEffect,
    trailLength: 8,
    snapToElements: true,
    enableShortcuts: true,
    cursorType: 'pointer'
  },
  stealth: {
    size: 18,
    color: '#64748b',
    opacity: 0.7,
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 50,
    shape: 'circle',
    shadow: true,
    shadowSize: 5,
    shadowColor: '#00000040',
    cursorVisibility: 'hover-only' as CursorVisibility,
    followAcceleration: true,
    lowPerformanceMode: true,
    cursorType: 'crosshair'
  },
  woodenFish: {
    size: 24,
    color: '#8B4513', // 木色
    opacity: 0.9,
    borderWidth: 2,
    borderColor: '#A0522D', // 深木色
    borderRadius: 50,
    shape: 'circle',
    shadow: true,
    shadowSize: 6,
    shadowBlur: 4,
    shadowColor: 'rgba(139, 69, 19, 0.3)', // 木色阴影
    clickEffect: 'ripple' as ClickEffect,
    trailEffect: 'none' as TrailEffect,
    cursorType: 'pointer',
    floatingTextEnabled: true,
    floatingTextType: 'number',
    floatingText: '+1',
    floatingTextSize: 18,
    floatingTextColor: '#DAA520', // 金色文字
    floatingTextDuration: 1200,
    floatingTextAnimation: 'easeOut' as FloatingTextAnimation,
    floatingTextFontWeight: 'bold',
    floatingTextOffsetY: -25,
    floatingTextComboEnabled: true,
    floatingTextComboThreshold: 2,
    floatingTextComboSpeed: 300,
    floatingTextNumberType: 'chinese_lower', // 使用中文数字
    floatingTextBold: true
   },
  magnetic: {
    size: 22,
    color: '#8b5cf6', // 紫色
    opacity: 0.9,
    borderWidth: 2,
    borderColor: '#a78bfa', // 浅紫色
    borderRadius: 50,
    shape: 'circle',
    shadow: true,
    shadowSize: 8,
    shadowBlur: 6,
    shadowColor: '#8b5cf633',
    hoverEffect: 'scale' as HoverEffect,
    hoverEffectIntensity: 1.2,
    clickEffect: 'ripple' as ClickEffect,
    cursorType: 'pointer',
    magneticCursorEnabled: true,
    magneticStrength: 0.4,
    magneticDistance: 120,
    magneticAnimationDuration: 0.25
  }
};

interface UseMouseConfigProps {
  pluginId: string;
  initialConfig?: Partial<MouseConfig>;
}

    // 创建默认配置的函数
const createDefaultConfig = (initialConfig?: Partial<MouseConfig>): MouseConfig => {
  // 默认基础配置 - 适用于所有插件
  const defaultConfig: MouseConfig = {
   // 基础外观
    size: 20,
    color: '#000000',
    opacity: 1,
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 0,
    shape: 'circle',
    cursorType: 'default',
    
    // 阴影效果
    shadow: false,
    shadowColor: '#00000033',
    shadowSize: 8,
    shadowBlur: 5,
    
    // 动画效果
    hoverEffect: 'scale' as HoverEffect,
    hoverEffectIntensity: 1.2,
    clickEffect: 'ripple' as ClickEffect,
    trailEffect: 'none' as TrailEffect,
    trailLength: 5,
    
    // 磁性光标设置
    magneticCursorEnabled: false,
    magneticStrength: 0.3,
    magneticDistance: 100,
    magneticAnimationDuration: 0.2,
    
  // 点击飘字特效
  floatingTextEnabled: false,
  floatingTextType: 'number',
  floatingText: '+1',
  floatingTextSize: 20,
  floatingTextColor: '#ff4d6d',
  floatingTextDuration: 1000,
  floatingTextAnimation: 'easeOut' as FloatingTextAnimation,
  floatingTextFontWeight: 'bold',
  floatingTextOffsetX: 0,
  floatingTextOffsetY: -20,
    floatingTextComboEnabled: false,
  floatingTextComboSpeed: 200,
  floatingTextComboThreshold: 2, // 兼容旧配置，实际已不再使用
  floatingTextNumberType: 'arabic',
    
     // 新增飘字改进字段
    floatingTextMode: 'default',
    floatingTextTemplate: '你当前点击了${number}次',
    floatingTextSequenceMode: 'sequential',
    floatingTextMultipleTexts: ['太棒了！', '好样的！', '继续加油！'],
    floatingTextMultipleImages: [],
    floatingTextFontFamily: 'inherit',
    floatingTextTrigger: 'left', // 新增：点击触发方式（left, right, middle, all）
    floatingTextBold: true,
    floatingTextItalic: false,
    floatingTextUnderline: false,
    floatingTextBackgroundColor: 'transparent',
    floatingTextBorderColor: 'transparent',
    floatingTextBorderWidth: 0,
    floatingTextShadow: 'none',
    
    // 预设方案
    preset: 'default',
    
    // 行为设置
    autoHide: false,
    hideDelay: 3000,
    snapToElements: false,
    followAcceleration: false,
    doubleClickBehavior: 'none' as DoubleClickBehavior,
    enableShortcuts: false,
    
    // 高级设置
    cursorVisibility: 'visible' as CursorVisibility,
    pointerEvents: 'auto' as PointerEvents,
    zIndex: 9999,
    
    // 性能和兼容性设置
    lowPerformanceMode: false,
    hardwareAcceleration: true,
    legacyBrowserMode: false,
    
    // 自定义指针图片
    customCursorImages: {},
    
    // 点击音效配置
    clickSoundEffect: {
      enabled: false,
      volume: 0.7,
      pitch: 1,
      delay: 0,
      loop: false,
      playbackRate: 1
    },
    
    // 不同指针类型的音效配置
    pointerTypeSoundEffects: {}
  };
  
  // 使用深度合并函数合并初始配置，确保嵌套对象也能正确合并
  return initialConfig ? mergeConfigs(defaultConfig, initialConfig) : defaultConfig;
};

export const useMouseConfig = ({ pluginId, initialConfig }: UseMouseConfigProps) => {
  // 初始化配置，确保配置对象完整
  const [config, setConfig] = useState<MouseConfig>(() => {
    // 从 localStorage 加载保存的配置（如果有）
    const savedConfig = readFromLocalStorage<MouseConfig | null>(`mouse-config-${pluginId}`, null);
    if (savedConfig) {
      return createDefaultConfig(savedConfig);
    }
    return createDefaultConfig(initialConfig);
  });

  // 保存配置到 localStorage
  useEffect(() => {
    storageService.set(`mouse-config-${pluginId}`, config);
  }, [config, pluginId]);

  // 获取预设方案特定的指针样式配置
  const getPresetPointerConfig = (presetName: string) => {
    return storageService.get<Partial<MouseConfig>>(
      `preset-pointer-config-${pluginId}-${presetName}`,
      presetDefinitions[presetName] || {}
    );
  };

  // 保存预设方案特定的指针样式配置
  const savePresetPointerConfig = (presetName: string, configData: MouseConfig) => {
    // 创建配置的深拷贝以避免引用问题
    const configCopy = deepClone(configData);
    storageService.set(`preset-pointer-config-${pluginId}-${presetName}`, configCopy);
  };

  // 应用预设方案
  const applyPreset = (presetName: string) => {
    const basePreset = presetDefinitions[presetName] || {};
    const savedPointerConfig = getPresetPointerConfig(presetName);
    
    // 合并基础预设和保存的指针配置，保存的配置优先级更高
    const mergedConfig = mergeConfigs(basePreset, savedPointerConfig);

    setConfig(prev => ({
      ...prev,
      ...mergedConfig,
      preset: presetName
    }));
  };

  // 更新配置
  const updateConfig = (key: keyof MouseConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 批量更新配置
  const updateMultipleConfig = (updates: Partial<MouseConfig>) => {
    // 使用深度合并确保嵌套对象也能正确更新
    setConfig(prev => mergeConfigs(prev, updates));
  };

  // 重置配置
  const resetConfig = () => {
    setConfig(createDefaultConfig());
  };

  // 导入配置
  const importConfig = (importedConfig: Partial<MouseConfig>) => {
    // 验证导入的配置是否有效
    try {
      const validatedConfig = createDefaultConfig(importedConfig);
      setConfig(validatedConfig);
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  };

  // 导出配置
  const exportConfig = (): MouseConfig => {
    // 返回配置的深拷贝
    return deepClone(config);
  };

  return {
    config,
    setConfig,
    updateConfig,
    updateMultipleConfig,
    resetConfig,
    importConfig,
    exportConfig,
    applyPreset,
    presetDefinitions,
    getPresetPointerConfig,
    savePresetPointerConfig
  };
};
