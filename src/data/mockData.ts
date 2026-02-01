import { Chat, Contact, Call, Message, User, Settings } from '@/types/messenger';

// Helper to generate random avatar colors
const avatarColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

const getAvatarColor = (name: string): string => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};

// Current user
export const currentUser: User = {
  id: 'user-1',
  name: 'Александр Иванов',
  username: 'alex_ivanov',
  phone: '+7 999 123-45-67',
  bio: 'Разработчик | Москва',
  isOnline: true,
};

// Default settings
export const defaultSettings: Settings = {
  theme: 'light',
  notifications: true,
  sounds: true,
  vibration: true,
  lastSeenPrivacy: 'everyone',
  profilePhotoPrivacy: 'everyone',
  fontSize: 'medium',
};

// Contacts
export const contacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Мария Петрова',
    username: 'maria_p',
    phone: '+7 999 111-22-33',
    bio: 'Дизайнер UI/UX',
    isOnline: true,
  },
  {
    id: 'contact-2',
    name: 'Дмитрий Смирнов',
    username: 'dmitry_s',
    phone: '+7 999 222-33-44',
    bio: 'Backend Developer',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: 'contact-3',
    name: 'Анна Козлова',
    username: 'anna_k',
    phone: '+7 999 333-44-55',
    isOnline: true,
  },
  {
    id: 'contact-4',
    name: 'Сергей Новиков',
    username: 'sergey_n',
    phone: '+7 999 444-55-66',
    bio: 'Product Manager',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'contact-5',
    name: 'Елена Морозова',
    username: 'elena_m',
    phone: '+7 999 555-66-77',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // yesterday
  },
  {
    id: 'contact-6',
    name: 'Павел Волков',
    username: 'pavel_v',
    phone: '+7 999 666-77-88',
    bio: 'iOS Developer',
    isOnline: true,
  },
  {
    id: 'contact-7',
    name: 'Ольга Федорова',
    username: 'olga_f',
    phone: '+7 999 777-88-99',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
  },
  {
    id: 'contact-8',
    name: 'Артём Лебедев',
    username: 'artem_l',
    phone: '+7 999 888-99-00',
    bio: 'DevOps Engineer',
    isOnline: true,
  },
  {
    id: 'contact-9',
    name: 'Наталья Соколова',
    username: 'natasha_s',
    phone: '+7 999 999-00-11',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
  {
    id: 'contact-10',
    name: 'Михаил Попов',
    username: 'mikhail_p',
    phone: '+7 999 000-11-22',
    bio: 'Android Developer',
    isOnline: true,
  },
];

// Generate messages for a chat
const generateMessages = (chatId: string, contactId: string): Message[] => {
  const now = Date.now();
  
  const messages: Message[] = [
    {
      id: `${chatId}-msg-1`,
      chatId,
      senderId: contactId,
      type: 'text',
      content: 'Привет! Как дела?',
      timestamp: new Date(now - 1000 * 60 * 60 * 2),
      status: 'read',
      isOutgoing: false,
    },
    {
      id: `${chatId}-msg-2`,
      chatId,
      senderId: 'user-1',
      type: 'text',
      content: 'Привет! Всё отлично, работаю над новым проектом 💻',
      timestamp: new Date(now - 1000 * 60 * 60 * 1.9),
      status: 'read',
      isOutgoing: true,
    },
    {
      id: `${chatId}-msg-3`,
      chatId,
      senderId: contactId,
      type: 'text',
      content: 'Круто! Что за проект?',
      timestamp: new Date(now - 1000 * 60 * 60 * 1.8),
      status: 'read',
      isOutgoing: false,
    },
    {
      id: `${chatId}-msg-4`,
      chatId,
      senderId: 'user-1',
      type: 'text',
      content: 'Делаю мессенджер в стиле Telegram, хочу показать как можно красиво реализовать интерфейс',
      timestamp: new Date(now - 1000 * 60 * 60 * 1.7),
      status: 'read',
      isOutgoing: true,
    },
    {
      id: `${chatId}-msg-5`,
      chatId,
      senderId: contactId,
      type: 'text',
      content: 'Звучит интересно! Покажешь когда будет готово?',
      timestamp: new Date(now - 1000 * 60 * 30),
      status: 'read',
      isOutgoing: false,
    },
    {
      id: `${chatId}-msg-6`,
      chatId,
      senderId: 'user-1',
      type: 'text',
      content: 'Конечно! Уже скоро 🚀',
      timestamp: new Date(now - 1000 * 60 * 25),
      status: 'delivered',
      isOutgoing: true,
    },
  ];
  
  return messages;
};

// Chats
export const chats: Chat[] = [
  {
    id: 'chat-1',
    name: 'Мария Петрова',
    isGroup: false,
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isOnline: true,
    lastMessage: {
      id: 'last-1',
      chatId: 'chat-1',
      senderId: 'contact-1',
      type: 'text',
      content: 'Отлично! Тогда до встречи завтра 😊',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'delivered',
      isOutgoing: false,
    },
  },
  {
    id: 'chat-2',
    name: 'Команда разработки',
    isGroup: true,
    unreadCount: 5,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    members: ['contact-2', 'contact-4', 'contact-6', 'contact-8'],
    lastMessage: {
      id: 'last-2',
      chatId: 'chat-2',
      senderId: 'contact-2',
      type: 'text',
      content: 'Дмитрий: Деплой прошёл успешно! ✅',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'delivered',
      isOutgoing: false,
    },
  },
  {
    id: 'chat-3',
    name: 'Дмитрий Смирнов',
    isGroup: false,
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    lastMessage: {
      id: 'last-3',
      chatId: 'chat-3',
      senderId: 'user-1',
      type: 'text',
      content: 'Хорошо, посмотрю код вечером',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'read',
      isOutgoing: true,
    },
  },
  {
    id: 'chat-4',
    name: 'Анна Козлова',
    isGroup: false,
    unreadCount: 1,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    isOnline: true,
    lastMessage: {
      id: 'last-4',
      chatId: 'chat-4',
      senderId: 'contact-3',
      type: 'voice',
      content: 'Голосовое сообщение',
      duration: 15,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'delivered',
      isOutgoing: false,
    },
  },
  {
    id: 'chat-5',
    name: 'Сергей Новиков',
    isGroup: false,
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    lastMessage: {
      id: 'last-5',
      chatId: 'chat-5',
      senderId: 'user-1',
      type: 'image',
      content: 'Фото',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      status: 'read',
      isOutgoing: true,
    },
  },
  {
    id: 'chat-6',
    name: 'Проект X',
    isGroup: true,
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    members: ['contact-1', 'contact-3', 'contact-5'],
    lastMessage: {
      id: 'last-6',
      chatId: 'chat-6',
      senderId: 'contact-1',
      type: 'text',
      content: 'Мария: Макеты готовы, отправляю в Figma',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'read',
      isOutgoing: false,
    },
  },
  {
    id: 'chat-7',
    name: 'Елена Морозова',
    isGroup: false,
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
    lastMessage: {
      id: 'last-7',
      chatId: 'chat-7',
      senderId: 'contact-5',
      type: 'text',
      content: 'Спасибо за помощь!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      status: 'read',
      isOutgoing: false,
    },
  },
  {
    id: 'chat-8',
    name: 'Павел Волков',
    isGroup: false,
    unreadCount: 3,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isOnline: true,
    lastMessage: {
      id: 'last-8',
      chatId: 'chat-8',
      senderId: 'contact-6',
      type: 'file',
      content: 'project.zip',
      fileName: 'project.zip',
      fileSize: 15000000,
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'delivered',
      isOutgoing: false,
    },
  },
];

// Calls history
export const calls: Call[] = [
  {
    id: 'call-1',
    contactId: 'contact-1',
    contact: contacts[0],
    type: 'video',
    status: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    duration: 1800,
  },
  {
    id: 'call-2',
    contactId: 'contact-2',
    contact: contacts[1],
    type: 'audio',
    status: 'missed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 'call-3',
    contactId: 'contact-3',
    contact: contacts[2],
    type: 'audio',
    status: 'incoming',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    duration: 300,
  },
  {
    id: 'call-4',
    contactId: 'contact-6',
    contact: contacts[5],
    type: 'video',
    status: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    duration: 3600,
  },
  {
    id: 'call-5',
    contactId: 'contact-4',
    contact: contacts[3],
    type: 'audio',
    status: 'declined',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];

// Messages store (by chat ID)
export const messagesByChat: Record<string, Message[]> = {
  'chat-1': generateMessages('chat-1', 'contact-1'),
  'chat-2': generateMessages('chat-2', 'contact-2'),
  'chat-3': generateMessages('chat-3', 'contact-2'),
  'chat-4': generateMessages('chat-4', 'contact-3'),
  'chat-5': generateMessages('chat-5', 'contact-4'),
  'chat-6': generateMessages('chat-6', 'contact-1'),
  'chat-7': generateMessages('chat-7', 'contact-5'),
  'chat-8': generateMessages('chat-8', 'contact-6'),
};

// Helper functions
export const getContactById = (id: string): Contact | undefined => {
  return contacts.find(c => c.id === id);
};

export const getChatById = (id: string): Chat | undefined => {
  return chats.find(c => c.id === id);
};

export const getMessagesForChat = (chatId: string): Message[] => {
  return messagesByChat[chatId] || [];
};

export const formatLastSeen = (date: Date): string => {
  const now = Date.now();
  const diff = now - date.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'только что';
  if (minutes < 60) return `был(а) ${minutes} мин. назад`;
  if (hours < 24) return `был(а) ${hours} ч. назад`;
  if (days === 1) return 'был(а) вчера';
  return `был(а) ${days} дн. назад`;
};

export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

export const formatCallDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}:${remainingMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export { getAvatarColor };
