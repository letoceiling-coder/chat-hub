export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export type MessageType = 'text' | 'voice' | 'image' | 'video' | 'file' | 'system';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  isOutgoing: boolean;
  // Voice message specific
  duration?: number;
  waveform?: number[];
  // Media specific
  mediaUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  fileSize?: number;
  // Reply
  replyTo?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  isGroup: boolean;
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  members?: string[];
  isOnline?: boolean;
  lastSeen?: Date;
  isTyping?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export type CallType = 'audio' | 'video';
export type CallStatus = 'incoming' | 'outgoing' | 'missed' | 'declined';

export interface Call {
  id: string;
  contactId: string;
  contact: Contact;
  type: CallType;
  status: CallStatus;
  timestamp: Date;
  duration?: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  phone: string;
  bio?: string;
  isOnline: boolean;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  sounds: boolean;
  vibration: boolean;
  lastSeenPrivacy: 'everyone' | 'contacts' | 'nobody';
  profilePhotoPrivacy: 'everyone' | 'contacts' | 'nobody';
  fontSize: 'small' | 'medium' | 'large';
}
