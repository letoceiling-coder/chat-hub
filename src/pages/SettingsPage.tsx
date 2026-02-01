import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Bell,
  Lock,
  Palette,
  Smartphone,
  Shield,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  LogOut,
  HelpCircle,
  Type,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import UserAvatar from '@/components/common/Avatar';
import { currentUser, defaultSettings } from '@/data/mockData';
import { Settings } from '@/types/messenger';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingItem = ({
  icon,
  label,
  value,
  onClick,
  danger,
}: SettingItemProps) => (
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
    {value !== undefined ? value : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
  </motion.div>
);

const applyTheme = (theme: 'light' | 'dark' | 'system') => {
  const root = document.documentElement;
  if (theme === 'system') {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', dark);
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
};

const applyFontSize = (size: 'small' | 'medium' | 'large') => {
  document.documentElement.dataset.fontSize = size;
  const scale = size === 'small' ? 0.9375 : size === 'large' ? 1.0625 : 1;
  document.documentElement.style.fontSize = `${16 * scale}px`;
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);

  useEffect(() => {
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
  }, [settings.theme, settings.fontSize]);

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setSettings((s) => ({ ...s, theme }));
  };

  const setFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    setSettings((s) => ({ ...s, fontSize }));
  };

  const toggleNotifications = () => {
    setSettings((s) => ({ ...s, notifications: !s.notifications }));
  };

  const handleLogout = () => {
    setLogoutOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-safe">
        <div className="h-14 px-4 flex items-center">
          <h1 className="text-xl font-semibold">Настройки</h1>
        </div>
      </header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-8">
        {/* Profile — tap → openProfile */}
        <div
          className="flex items-center gap-4 p-4 cursor-pointer active:bg-secondary"
          onClick={() => navigate('/profile')}
        >
          <UserAvatar name={currentUser.name} size="xl" isOnline />
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold truncate">{currentUser.name}</p>
            <p className="text-sm text-muted-foreground truncate">@{currentUser.username}</p>
            <p className="text-sm text-muted-foreground truncate">{currentUser.phone}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>

        {currentUser.bio && (
          <div className="px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">О себе</p>
            <p className="mt-1">{currentUser.bio}</p>
          </div>
        )}

        {/* Profile */}
        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<User className="h-5 w-5" />}
            label="Профиль"
            onClick={() => navigate('/profile')}
          />
        </div>

        {/* Notifications */}
        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<Bell className="h-5 w-5" />}
            label="Уведомления"
            value={<Switch checked={settings.notifications} onCheckedChange={toggleNotifications} />}
          />
        </div>

        {/* Privacy & Security */}
        <div className="mt-4 border-t border-border">
          <SettingItem icon={<Lock className="h-5 w-5" />} label="Приватность" />
          <SettingItem icon={<Shield className="h-5 w-5" />} label="Безопасность" />
        </div>

        {/* Appearance — spec: Light / Dark / System, Font size, Chat wallpaper */}
        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<Palette className="h-5 w-5" />}
            label="Внешний вид"
            onClick={() => setAppearanceOpen(true)}
          />
        </div>

        {/* Devices */}
        <div className="mt-4 border-t border-border">
          <SettingItem icon={<Smartphone className="h-5 w-5" />} label="Устройства" />
          <SettingItem icon={<HelpCircle className="h-5 w-5" />} label="Помощь" />
        </div>

        {/* Logout — modal confirm */}
        <div className="mt-4 border-t border-border">
          <SettingItem
            icon={<LogOut className="h-5 w-5" />}
            label="Выйти"
            danger
            onClick={() => setLogoutOpen(true)}
          />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Messenger v1.0.0</p>
        </div>
      </motion.div>

      {/* Logout confirmation */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="rounded-2xl shadow-modal max-w-[calc(100%-32px)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Выйти из аккаунта?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы сможете снова войти, используя свой номер телефона.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Выйти
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Appearance dialog — Theme + Font size */}
      <Dialog open={appearanceOpen} onOpenChange={setAppearanceOpen}>
        <DialogContent className="rounded-2xl shadow-modal max-w-[calc(100%-32px)]">
          <DialogHeader>
            <DialogTitle>Внешний вид</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <div>
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                <Monitor className="h-4 w-4" />
                Тема
              </Label>
              <RadioGroup
                value={settings.theme}
                onValueChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}
                className="flex flex-col gap-2"
              >
                <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Sun className="h-5 w-5 text-muted-foreground" />
                  <span>Светлая</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <span>Тёмная</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <span>Как в системе</span>
                </label>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                <Type className="h-4 w-4" />
                Размер шрифта
              </Label>
              <RadioGroup
                value={settings.fontSize}
                onValueChange={(v) => setFontSize(v as 'small' | 'medium' | 'large')}
                className="flex flex-col gap-2"
              >
                <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="small" id="font-small" />
                  <span className="text-sm">Маленький</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="medium" id="font-medium" />
                  <span>Обычный</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="large" id="font-large" />
                  <span className="text-lg">Крупный</span>
                </label>
              </RadioGroup>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
