import PluginManager from '@/components/PluginManager';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {
  // 页面加载时显示欢迎信息
  useEffect(() => {
    toast('欢迎使用浏览器插件管理器', {
      description: '您可以管理和配置各种浏览器插件，包括视频速度控制、鼠标自定义等功能',
      duration: 5000
    });
  }, []);

  return <PluginManager />;
}
