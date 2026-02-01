import { Outlet, useLocation } from 'react-router-dom';
import FeedBottomNav from './FeedBottomNav';
import { useFeed } from '@/context/FeedContext';

const FeedLayout = () => {
  const location = useLocation();
  const { unreadNotificationsCount } = useFeed();
  const hideBottomNav = location.pathname.startsWith('/feed/post/');

  return (
    <div className="min-h-screen bg-background">
      <main className={hideBottomNav ? '' : 'pb-16'}>
        <Outlet />
      </main>
      {!hideBottomNav && <FeedBottomNav notificationCount={unreadNotificationsCount} />}
    </div>
  );
};

export default FeedLayout;
