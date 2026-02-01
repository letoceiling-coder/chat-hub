import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Paperclip, Smile, Send, Mic, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import UserAvatar from '@/components/common/Avatar';
import { getChatById, getMessagesForChat, formatMessageTime, formatLastSeen, contacts } from '@/data/mockData';
import { Message } from '@/types/messenger';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chat = useMemo(() => {
    if (!chatId) return null;
    return getChatById(chatId);
  }, [chatId]);

  // Load messages
  useEffect(() => {
    if (chatId) {
      const chatMessages = getMessagesForChat(chatId);
      setMessages(chatMessages);
    }
  }, [chatId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get contact info for status display
  const contactInfo = useMemo(() => {
    if (!chat || chat.isGroup) return null;
    const contactId = chatId?.replace('chat-', 'contact-');
    return contacts.find(c => c.id === contactId);
  }, [chat, chatId]);

  const getStatusText = () => {
    if (!chat) return '';
    if (chat.isGroup) {
      return `${chat.members?.length || 0} участников`;
    }
    if (isTyping) return 'печатает...';
    if (chat.isOnline) return 'онлайн';
    if (chat.lastSeen) return formatLastSeen(chat.lastSeen);
    return '';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !chatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId: 'user-1',
      type: 'text',
      content: inputValue.trim(),
      timestamp: new Date(),
      status: 'sent',
      isOutgoing: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate delivery after 1s
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)
      );
    }, 1000);

    // Simulate read after 2s
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)
      );
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const renderMessageStatus = (message: Message) => {
    if (!message.isOutgoing) return null;
    
    switch (message.status) {
      case 'sending':
        return <span className="text-[10px] text-muted-foreground">•••</span>;
      case 'sent':
        return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3.5 w-3.5 text-primary" />;
      default:
        return null;
    }
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';
    
    messages.forEach(message => {
      const messageDate = message.timestamp.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
      });
      
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groups.push({ date: messageDate, messages: [message] });
      } else {
        groups[groups.length - 1].messages.push(message);
      }
    });
    
    return groups;
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Чат не найден</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-secondary/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-safe">
        <div className="flex items-center h-14 px-2 gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div 
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => {/* Open chat info */}}
          >
            <UserAvatar
              name={chat.name}
              size="md"
              isOnline={!chat.isGroup && chat.isOnline}
            />
            <div className="min-w-0">
              <p className="font-semibold truncate">{chat.name}</p>
              <p className={cn(
                'text-xs truncate',
                chat.isOnline || isTyping ? 'text-primary' : 'text-muted-foreground'
              )}>
                {getStatusText()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <AnimatePresence>
          {groupedMessages.map((group) => (
            <div key={group.date}>
              {/* Date separator */}
              <div className="flex justify-center my-4">
                <span className="px-3 py-1 text-xs bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground shadow-sm">
                  {group.date}
                </span>
              </div>
              
              {/* Messages */}
              {group.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex mb-1',
                    message.isOutgoing ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-3 py-2 shadow-sm',
                      message.isOutgoing
                        ? 'bg-[hsl(var(--message-outgoing))] text-[hsl(var(--message-outgoing-foreground))] rounded-br-md'
                        : 'bg-[hsl(var(--message-incoming))] text-[hsl(var(--message-incoming-foreground))] rounded-bl-md'
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    <div className={cn(
                      'flex items-center gap-1 mt-1',
                      message.isOutgoing ? 'justify-end' : 'justify-start'
                    )}>
                      <span className="text-[10px] text-muted-foreground">
                        {formatMessageTime(message.timestamp)}
                      </span>
                      {renderMessageStatus(message)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-background border-t border-border pb-safe">
        <div className="flex items-end gap-2 p-2">
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Сообщение"
              rows={1}
              className="min-h-[40px] max-h-[120px] py-2.5 pr-10 resize-none bg-secondary border-none focus-visible:ring-1"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 bottom-1 h-8 w-8 text-muted-foreground"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={cn(
              'shrink-0 rounded-full transition-colors',
              inputValue.trim() ? 'bg-primary' : 'bg-secondary text-muted-foreground'
            )}
          >
            {inputValue.trim() ? (
              <Send className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
