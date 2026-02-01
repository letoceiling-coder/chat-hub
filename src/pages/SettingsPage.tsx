import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Bell, Lock, Palette, Smartphone, Shield,
  ChevronRight, Moon, Sun, LogOut, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import UserAvatar from '@/components/common/Avatar';
import { currentUser, defaultSettings } from '@/data/mockData';
import { Settings } from '@/types/messenger';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingItem = ({ icon, label, value, onClick, danger }: SettingItemProps) => (
  <motion.div
    whileTap={{ backgroundColor: 'hsl(var(--secondary))' }}
    onClick={onClick}
    className={cn(
      'flex items-center gap-4 px-4 py-3 cursor-pointer active:bg-secondary',
      danger && 'text-destructive'
    )}
  >
    <span className={cn('text-muted-foreground', danger && 'text-destructive')}>
      {icon}
    </span>
    <span className="flex-1">{label}</span>
    {value !== undefined ? (
      value
    ) : (
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    )}
  </motion.div>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleDarkMode = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    setSettings({ ...settings, theme: newTheme });
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleNotifications = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-safe">
        <div className="flex items-center h-14 px-4">
          <h1 className="text-xl font-semibold">Настройки</h1>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-8"
      >
        {/* Profile section */}
        <div 
          className="flex items-center gap-4 p-4 cursor-pointer active:bg-secondary"
          onClick={() => {/* Open profile edit */}}
        >
          <UserAvatar
            name={currentUser.name}
            size="xl"
            isOnline
          />
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold truncate">{currentUser.name}</p>
            <p className="text-sm text-muted-foreground truncate">@{currentUser.username}</p>
            <p className="text-sm text-muted-foreground truncate">{currentUser.phone}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <div className="px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">О себе</p>
            <p className="mt-1">{currentUser.bio}</p>
          </div>
        )}

        {/* Settings sections */}
        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<Bell className="h-5 w-5" />}
            label="Уведомления"
            value={
              <Switch 
                checked={settings.notifications} 
                onCheckedChange={toggleNotifications}
              />
            }
          />
        </div>

        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<Lock className="h-5 w-5" />}
            label="Приватность"
          />
          <SettingItem
            icon={<Shield className="h-5 w-5" />}
            label="Безопасность"
          />
        </div>

        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={settings.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            label="Тёмная тема"
            value={
              <Switch 
                checked={settings.theme === 'dark'} 
                onCheckedChange={toggleDarkMode}
              />
            }
          />
          <SettingItem
            icon={<Palette className="h-5 w-5" />}
            label="Внешний вид"
          />
        </div>

        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<Smartphone className="h-5 w-5" />}
            label="Устройства"
          />
          <SettingItem
            icon={<HelpCircle className="h-5 w-5" />}
            label="Помощь"
          />
        </div>

        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<LogOut className="h-5 w-5" />}
            label="Выйти"
            danger
          />
        </div>

        {/* Version */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Messenger v1.0.0</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
