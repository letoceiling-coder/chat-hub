import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useMemo } from 'react';
import { chats, calls } from '@/data/mockData';

const MainLayout = () => {
  const location = useLocation();
  
  // Hide bottom nav on chat view and call screens
  const hideBottomNav = useMemo(() => {
    return location.pathname.startsWith('/chat/') || 
           location.pathname.startsWith('/call/');
  }, [location.pathname]);

  // Calculate badges
  const unreadChats = useMemo(() => {
    return chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  }, []);

  const missedCalls = useMemo(() => {
    return calls.filter(call => call.status === 'missed').length;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className={hideBottomNav ? '' : 'pb-16'}>
        <Outlet />
      </main>
      
      {!hideBottomNav && (
        <BottomNav unreadChats={unreadChats} missedCalls={missedCalls} />
      )}
    </div>
  );
};

export default MainLayout;
