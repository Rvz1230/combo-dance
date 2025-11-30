export interface PluginType {
  id: string;
  name: string;
  icon: string;
  color: string;
  config: Record<string, any>;
  // 插件启用状态
  enabled: boolean;
  // 拖拽排序相关属性
  order?: number;
  // 插件描述
  description?: string;
  // 使用频率
  usageFrequency?: number;
  // 安装日期
  installDate?: string;
  // 上次使用时间
  lastUsed?: string;
}

// 指针类型定义
export type CursorType = 
  | 'default'
  | 'pointer'
  | 'crosshair'
  | 'text'
  | 'move'
  | 'wait'
  | 'not-allowed'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'creative-mouse'; // 创意双圆点鼠标

// 鼠标形状定义
export type MouseShape = 
  | 'circle'
  | 'square'
  | 'rounded-square'
  | 'triangle'
  | 'crosshair'
  | 'diamond'
  | 'heart'
  | 'star'
  | 'hexagon';

// 悬停效果类型
export type HoverEffect = 'none' | 'scale' | 'pulse';

// 点击效果类型
export type ClickEffect = 'none' | 'ripple' | 'bounce' | 'explode' | 'shrink' | 'spin';

// 轨迹效果类型
export type TrailEffect = 'none' | 'trail' | 'comet' | 'particles' | 'echo' | 'rainbow';

// 鼠标可见性类型
export type CursorVisibility = 'visible' | 'hover-only' | 'hidden';

// 指针事件类型
export type PointerEvents = 'auto' | 'none';

// 双击行为类型
export type DoubleClickBehavior = 'none' | 'reset' | 'toggleVisibility' | 'openSettings';

// 飘字动画类型
export type FloatingTextAnimation = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce' | 'elastic';

// 飘字内容模式
export type FloatingTextMode = 'default' | 'template';

// 文本飘字顺序模式
export type TextSequenceMode = 'sequential' | 'random';

// 音效类型定义
export interface SoundEffect {
  // 是否启用音效
  enabled: boolean;
  // 音频数据URL
  audioData?: string;
  // 音量 (0-1)
  volume: number;
  // 音调 (0.5-2)
  pitch: number;
  // 播放延迟 (ms)
  delay: number;
  // 循环播放
  loop: boolean;
  // 播放速率
  playbackRate: number;
  // 音频格式
  audioFormat?: string;
}

// 鼠标配置接口
export interface MouseConfig {
  // 基础外观
  size: number;
  color: string;
  opacity: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  shape: MouseShape;
  cursorType: CursorType;
  
  // 阴影效果
  shadow: boolean;
  shadowColor: string;
  shadowSize: number;
  shadowBlur: number;
  
  // 动画效果
  hoverEffect: HoverEffect;
  hoverEffectIntensity: number;
  clickEffect: ClickEffect;
  trailEffect: TrailEffect;
  trailLength: number;
  
  // 点击飘字特效
  floatingTextEnabled: boolean;
  floatingTextType: 'number' | 'text';
  floatingText: string;
  floatingTextSize: number;
  floatingTextColor: string;
  floatingTextDuration: number;
  floatingTextAnimation: FloatingTextAnimation;
  floatingTextFontWeight: string;
  floatingTextOffsetX: number;
  floatingTextOffsetY: number;
    floatingTextComboEnabled: boolean;
  floatingTextComboSpeed: number;
  floatingTextComboThreshold?: number;
  
  // 数字类型
  floatingTextNumberType?: 'arabic' | 'chinese_upper' | 'chinese_lower' | 'english' | 'roman' | 'bubble' | 'emoji' | 'math_bold';
  
  // 新增字段 - 飘字改进
  floatingTextMode: FloatingTextMode; // 数字飘字模式：默认或模板
   floatingTextTemplate: string; // 模板字符串
  floatingTextSequenceMode: TextSequenceMode; // 文本飘字顺序模式
  floatingTextMultipleTexts: string[]; // 多个文本内容
  floatingTextMultipleImages: string[]; // 多个图片内容
  floatingTextFontFamily: string; // 字体类型
  floatingTextBold: boolean; // 粗体
  floatingTextItalic: boolean; // 斜体
  floatingTextTrigger: 'left' | 'right' | 'middle' | 'all'; // 点击触发方式
  floatingTextUnderline: boolean; // 下划线
  floatingTextBackgroundColor: string; // 背景色
  floatingTextBorderColor: string; // 边框色
  floatingTextBorderWidth: number; // 边框宽度
  floatingTextShadow: string; // 阴影效果
  
  // 预设方案
  preset: string;
  
  // 行为设置
  autoHide: boolean;
  hideDelay: number;
  snapToElements: boolean;
  followAcceleration: boolean;
  doubleClickBehavior: DoubleClickBehavior;
  enableShortcuts: boolean;
  
  // 高级设置
  cursorVisibility: CursorVisibility;
  pointerEvents: PointerEvents;
  zIndex: number;
  
  // 性能和兼容性设置
  lowPerformanceMode: boolean;
  hardwareAcceleration: boolean;
  legacyBrowserMode: boolean;
  
  // 自定义指针图片
  customCursorImages?: Record<CursorType, string>;
  
  // 点击音效配置
  clickSoundEffect: SoundEffect;
  
   // 不同指针类型的音效配置
  pointerTypeSoundEffects?: Record<CursorType, SoundEffect>;
  
  // 磁性光标设置
  magneticCursorEnabled?: boolean;
  magneticStrength?: number;
  magneticDistance?: number;
  magneticAnimationDuration?: number;
}

 // 快进快退单位类型
export type SeekUnit = 'seconds' | 'percent' | 'frames';

// 视频速度控制配置接口
export interface VideoSpeedConfigType {
  enabled: boolean;
  defaultSpeed: number;
  rememberSpeed: boolean;
  rememberPerSite: boolean;
  audioPitchCorrection: boolean;
  showSpeedIndicator: boolean;
  indicatorDuration: number;
  keyboardShortcuts: {
    increaseSpeed: string;
    decreaseSpeed: string;
    resetSpeed: string;
    preset1: string;
    preset2: string;
    preset3: string;
    preset4: string;
    seekForward: string;
    seekBackward: string;
  };
  speedPresets: number[];
  // 时间轴移动设置
  seekForwardTime: number;
  seekBackwardTime: number;
  seekUnit: SeekUnit;
}

// Token配置接口
export interface TokenConfig {
  name: string;
  value: string;
  domain: string;
  enabled: boolean;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  expiration?: string;
  createdAt: string;
  // 源网站配置
  sourceDomain?: string;
  // 存储位置
  storageLocation?: 'cookie' | 'localStorage' | 'sessionStorage';
  // 自动刷新配置
  autoRefresh?: boolean;
  refreshInterval?: number;
  refreshMethod?: 'auto' | 'manual';
}

// Token注入器配置接口
export interface TokenInjectorConfigType {
  enabled: boolean;
  tokens: TokenConfig[];
  autoInject: boolean;
  showNotification: boolean;
  includeSubdomains: boolean;
}

// 页面工具配置接口
export interface PageToolsConfigType {
  enabled: boolean;
  outlineElements: boolean;
  outlineColor: string;
  outlineWidth: number;
  editPage: boolean;
  enableCustomScripts: boolean;
  customScript: string;
}
