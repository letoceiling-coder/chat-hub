import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatListHeader from '@/components/chats/ChatListHeader';
import ChatListItem from '@/components/chats/ChatListItem';
import { chats } from '@/data/mockData';
import { Chat } from '@/types/messenger';
import { motion } from 'framer-motion';

const ChatsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Sort chats: pinned first, then by last message time
  const sortedChats = useMemo(() => {
    let filtered = [...chats].filter(chat => !chat.isArchived);
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(chat => 
        chat.name.toLowerCase().includes(query) ||
        chat.lastMessage?.content.toLowerCase().includes(query)
      );
    }
    
    // Sort
    return filtered.sort((a, b) => {
      // Pinned first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then by time
      const timeA = a.lastMessage?.timestamp.getTime() || 0;
      const timeB = b.lastMessage?.timestamp.getTime() || 0;
      return timeB - timeA;
    });
  }, [searchQuery]);

  const handleChatClick = (chat: Chat) => {
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <ChatListHeader 
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="divide-y divide-border"
      >
        {sortedChats.length > 0 ? (
          sortedChats.map((chat, index) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onClick={() => handleChatClick(chat)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg">Чаты не найдены</p>
            {searchQuery && (
              <p className="text-sm mt-1">Попробуйте изменить запрос</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatsPage;
