import { useState } from 'react';
import { Search, Edit, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/common/Avatar';
import { currentUser } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ChatListHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const ChatListHeader = ({ onSearch, searchQuery }: ChatListHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      onSearch('');
    }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border pt-safe">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side - User avatar or back button */}
        <AnimatePresence mode="wait">
          {isSearchOpen ? (
            <motion.div
              key="search-input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex items-center gap-2"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
                className="shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Чаты и сообщения..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                autoFocus
                className="flex-1 h-9 bg-secondary border-none focus-visible:ring-0"
              />
            </motion.div>
          ) : (
            <motion.div
              key="header-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 flex-1"
            >
              {/* User avatar - opens settings */}
              <button 
                onClick={() => navigate('/settings')}
                className="touch-feedback rounded-full"
              >
                <UserAvatar 
                  name={currentUser.name} 
                  size="md"
                  isOnline
                />
              </button>
              
              {/* App title */}
              <h1 className="text-xl font-semibold text-primary">Messenger</h1>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Right side - Actions */}
        {!isSearchOpen && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/contacts')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ChatListHeader;
