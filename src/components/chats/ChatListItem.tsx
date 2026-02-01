import { Chat } from '@/types/messenger';
import UserAvatar from '@/components/common/Avatar';
import { formatMessageTime } from '@/data/mockData';
import { Pin, VolumeX, Check, CheckCheck, Mic, Image, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChatListItemProps {
  chat: Chat;
  onClick: () => void;
  onLongPress?: () => void;
}

const ChatListItem = ({ chat, onClick, onLongPress }: ChatListItemProps) => {
  const { lastMessage } = chat;
  
  const getMessagePreview = () => {
    if (!lastMessage) return '';
    
    switch (lastMessage.type) {
      case 'voice':
        return (
          <span className="flex items-center gap-1">
            <Mic className="h-4 w-4 text-primary" />
            Голосовое сообщение
          </span>
        );
      case 'image':
        return (
          <span className="flex items-center gap-1">
            <Image className="h-4 w-4 text-primary" />
            Фото
          </span>
        );
      case 'file':
        return (
          <span className="flex items-center gap-1">
            <File className="h-4 w-4 text-primary" />
            {lastMessage.fileName || 'Файл'}
          </span>
        );
      default:
        return lastMessage.content;
    }
  };

  const getMessageStatus = () => {
    if (!lastMessage || !lastMessage.isOutgoing) return null;
    
    switch (lastMessage.status) {
      case 'sent':
        return <Check className="h-4 w-4 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileTap={{ backgroundColor: 'hsl(var(--secondary))' }}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
        'active:bg-secondary',
        chat.isPinned && 'bg-secondary/50'
      )}
    >
      {/* Avatar */}
      <UserAvatar 
        name={chat.name} 
        size="lg"
        isOnline={!chat.isGroup && chat.isOnline}
      />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          {/* Name */}
          <span className={cn(
            'font-medium truncate',
            chat.unreadCount > 0 && 'font-semibold'
          )}>
            {chat.name}
          </span>
          
          {/* Time and status */}
          <div className="flex items-center gap-1 shrink-0">
            {getMessageStatus()}
            <span className={cn(
              'text-xs',
              chat.unreadCount > 0 ? 'text-primary font-medium' : 'text-muted-foreground'
            )}>
              {lastMessage ? formatMessageTime(lastMessage.timestamp) : ''}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-2 mt-0.5">
          {/* Message preview */}
          <p className={cn(
            'text-sm truncate',
            chat.unreadCount > 0 ? 'text-foreground' : 'text-muted-foreground'
          )}>
            {chat.isTyping ? (
              <span className="text-primary">печатает...</span>
            ) : (
              getMessagePreview()
            )}
          </p>
          
          {/* Badges and icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {chat.isMuted && (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
            {chat.isPinned && (
              <Pin className="h-4 w-4 text-muted-foreground rotate-45" />
            )}
            {chat.unreadCount > 0 && (
              <span className={cn(
                'min-w-[20px] h-5 px-1.5 flex items-center justify-center',
                'rounded-full text-xs font-medium',
                chat.isMuted 
                  ? 'bg-muted-foreground text-background' 
                  : 'bg-primary text-primary-foreground'
              )}>
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatListItem;
