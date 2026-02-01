import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/common/Avatar';
import { contacts, formatLastSeen } from '@/data/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.username?.toLowerCase().includes(query) ||
      contact.phone?.includes(query)
    );
  }, [searchQuery]);

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const groups: Record<string, typeof contacts> = {};
    
    filteredContacts.forEach(contact => {
      const letter = contact.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(contact);
    });
    
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredContacts]);

  const handleContactClick = (contactId: string) => {
    // Find or create chat with this contact
    navigate(`/chat/contact-${contactId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-safe">
        <div className="flex items-center h-14 px-4 gap-3">
          <h1 className="text-xl font-semibold flex-1">Контакты</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary"
          >
            <UserPlus className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-none focus-visible:ring-1"
            />
          </div>
        </div>
      </header>

      {/* Contact list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-4"
      >
        {groupedContacts.length > 0 ? (
          groupedContacts.map(([letter, groupContacts]) => (
            <div key={letter}>
              {/* Letter header */}
              <div className="sticky top-[7.5rem] bg-background px-4 py-2 z-10">
                <span className="text-sm font-medium text-primary">{letter}</span>
              </div>
              
              {/* Contacts in group */}
              {groupContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileTap={{ backgroundColor: 'hsl(var(--secondary))' }}
                  onClick={() => handleContactClick(contact.id)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-secondary"
                >
                  <UserAvatar
                    name={contact.name}
                    size="lg"
                    isOnline={contact.isOnline}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contact.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.isOnline 
                        ? <span className="text-[hsl(var(--online-green))]">онлайн</span>
                        : contact.lastSeen 
                          ? formatLastSeen(contact.lastSeen)
                          : contact.username ? `@${contact.username}` : ''
                      }
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg">Контакты не найдены</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ContactsPage;
