import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatListHeader from '@/components/chats/ChatListHeader';
import ChatListItem from '@/components/chats/ChatListItem';
import { useChats } from '@/context/ChatsContext';
import { Chat } from '@/types/messenger';
import { motion } from 'framer-motion';
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

const ChatsPage = () => {
  const navigate = useNavigate();
  const { chats, pinChat, muteChat, archiveChat, deleteChat } = useChats();
  const [searchQuery, setSearchQuery] = useState('');
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const [openedChatId, setOpenedChatId] = useState<string | null>(null);

  const sortedChats = useMemo(() => {
    let filtered = [...chats].filter((chat) => !chat.isArchived);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (chat) =>
          chat.name.toLowerCase().includes(query) ||
          chat.lastMessage?.content.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const timeA = a.lastMessage?.timestamp.getTime() || 0;
      const timeB = b.lastMessage?.timestamp.getTime() || 0;
      return timeB - timeA;
    });
  }, [chats, searchQuery]);

  const handleChatClick = (chat: Chat) => {
    navigate(`/chat/${chat.id}`);
  };

  const handleDeleteConfirm = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete.id);
      setChatToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ChatListHeader searchQuery={searchQuery} onSearch={setSearchQuery} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="divide-y divide-border"
      >
        {sortedChats.length > 0 ? (
          sortedChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onClick={() => handleChatClick(chat)}
              onPin={(c) => pinChat(c.id, !c.isPinned)}
              onMute={(c) => muteChat(c.id, !c.isMuted)}
              onArchive={(c) => archiveChat(c.id, !c.isArchived)}
              onDelete={(c) => setChatToDelete(c)}
              isRevealed={openedChatId === chat.id}
              onRevealChange={setOpenedChatId}
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

      <AlertDialog open={!!chatToDelete} onOpenChange={(open) => !open && setChatToDelete(null)}>
        <AlertDialogContent className="rounded-2xl shadow-modal max-w-[calc(100%-32px)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить чат?</AlertDialogTitle>
            <AlertDialogDescription>
              История переписки с {chatToDelete?.name} будет удалена. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChatsPage;
