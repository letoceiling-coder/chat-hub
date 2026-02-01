import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AUTH_STORAGE_KEY = 'messenger-auth';

interface AuthState {
  phone: string | null;
  isAuthenticated: boolean;
}

interface AuthContextValue {
  phone: string | null;
  isAuthenticated: boolean;
  /** Отправить код на номер (переход на шаг ввода кода) */
  requestCode: (phone: string) => void;
  /** Подтвердить код из SMS. Для теста код 1234 */
  verifyCode: (code: string) => boolean;
  logout: () => void;
  /** Номер, на который отправлен код (для экрана ввода кода) */
  pendingPhone: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { phone: null, isAuthenticated: false };
    const { phone } = JSON.parse(raw) as { phone: string };
    return { phone: phone || null, isAuthenticated: !!phone };
  } catch {
    return { phone: null, isAuthenticated: false };
  }
}

function saveAuth(phone: string | null) {
  if (phone) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ phone }));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

/** Код для тестирования */
const TEST_SMS_CODE = '1234';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(loadAuth);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  const requestCode = useCallback((phone: string) => {
    const digits = phone.replace(/\D/g, '');
    const normalized = digits.length >= 10 ? `+7${digits.slice(-10)}` : '';
    if (normalized) {
      setPendingPhone(normalized);
    }
  }, []);

  const verifyCode = useCallback((code: string): boolean => {
    const trimmed = code.trim();
    if (trimmed !== TEST_SMS_CODE) return false;
    const phone = pendingPhone;
    if (!phone) return false;
    setState({ phone, isAuthenticated: true });
    setPendingPhone(null);
    saveAuth(phone);
    return true;
  }, [pendingPhone]);

  const logout = useCallback(() => {
    setState({ phone: null, isAuthenticated: false });
    setPendingPhone(null);
    saveAuth(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      phone: state.phone,
      isAuthenticated: state.isAuthenticated,
      requestCode,
      verifyCode,
      logout,
      pendingPhone,
    }),
    [state.phone, state.isAuthenticated, requestCode, verifyCode, logout, pendingPhone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
