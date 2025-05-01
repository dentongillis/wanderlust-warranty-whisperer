import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, MessageSquarePlus, SidebarIcon, Share2, X, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import { useToast } from "@/hooks/use-toast";
import { format, isToday, isYesterday, isSameWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface AIChatAssistantProps {
  onClose?: () => void;
  onMinimize?: () => void;
  resetConversation?: boolean;
  chatId?: string;
  onNewChat?: () => void;
  onChatChange?: (chatId: string) => void;
  showThreads?: boolean;
  onToggleThreads?: () => void;
}

// Create a chat storage for persisting chats
export const chatsStorageKey = "warranty-ai-chats";

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  lastUpdated: Date;
  createdAt: Date;
  page?: string;
}

// Helper function to generate the initial message based on page name
const generateInitialMessage = (pageName: string): Message => ({
  role: "assistant",
  content: `Hello! I'm your RV warranty assistant. I see you're on the ${pageName} page. Ask me anything about warranty claims, trends, or statistics related to what you're viewing.`,
  timestamp: new Date(),
});

// Helper to get page name from path
const getPageNameFromPath = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    "/": "Dashboard",
    "/root-cause": "Root Cause Analysis",
    "/predictive": "Predictive Analytics",
    "/dealer-performance": "Dealer Performance",
    "/customer-impact": "Customer Impact",
    "/financial-impact": "Financial Impact",
    "/claims-report": "Detailed Claims Report"
  };
  
  return pathMap[pathname] || "Dashboard";
};

// Helper to group chats by date
const groupChatsByDate = (chats: Chat[]) => {
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  const grouped: Record<string, Chat[]> = {
    'Today': [],
    'Yesterday': [],
    'This Week': [],
    'This Month': [],
    'Earlier': []
  };

  sortedChats.forEach(chat => {
    const date = new Date(chat.lastUpdated);
    
    if (isToday(date)) {
      grouped['Today'].push(chat);
    } else if (isYesterday(date)) {
      grouped['Yesterday'].push(chat);
    } else if (isSameWeek(date, new Date(), { weekStartsOn: 1 })) {
      grouped['This Week'].push(chat);
    } else if (isThisMonth(date)) {
      grouped['This Month'].push(chat);
    } else {
      grouped['Earlier'].push(chat);
    }
  });

  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
};

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ 
  onClose, 
  onMinimize, 
  resetConversation = false, 
  chatId,
  onNewChat,
  onChatChange,
  showThreads = true,
  onToggleThreads
}) => {
  const location = useLocation();
  const pageName = getPageNameFromPath(location.pathname);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showLocalThreads, setShowLocalThreads] = useState(showThreads);
  const { toast } = useToast();
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Get chats from storage or initialize
  const getStoredChats = (): Chat[] => {
    const stored = localStorage.getItem(chatsStorageKey);
    return stored ? JSON.parse(stored) : [];
  };

  // Get active chat or create a new one
  const getActiveChat = (chats: Chat[], activeChatId?: string): { chat: Chat, isNew: boolean } => {
    // Find existing chat
    if (activeChatId) {
      const existingChat = chats.find(c => c.id === activeChatId);
      if (existingChat) {
        return { chat: existingChat, isNew: false };
      }
    }
    
    // Create new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      messages: [generateInitialMessage(pageName)],
      lastUpdated: new Date(),
      createdAt: new Date(),
      page: pageName
    };
    
    return { chat: newChat, isNew: true };
  };

  // Get or initialize chat data
  const [chats, setChats] = useState<Chat[]>(() => getStoredChats());
  const [activeChat, setActiveChat] = useState<Chat>(() => {
    const { chat, isNew } = getActiveChat(getStoredChats(), chatId);
    if (isNew) {
      // If this is a new chat, save it immediately to the chats list
      const updatedChats = [...getStoredChats(), chat];
      localStorage.setItem(chatsStorageKey, JSON.stringify(updatedChats));
    }
    return chat;
  });

  // Group chats by date
  const groupedChats = groupChatsByDate(chats);
  const threadsContainerRef = useRef<HTMLDivElement>(null);

  // Update local storage whenever chats change
  useEffect(() => {
    localStorage.setItem(chatsStorageKey, JSON.stringify(chats));
  }, [chats]);

  // Keep local threads state in sync with props
  useEffect(() => {
    setShowLocalThreads(showThreads);
  }, [showThreads]);

  // Update when external chatId prop changes
  useEffect(() => {
    if (chatId && chatId !== activeChat.id) {
      const existingChat = chats.find(c => c.id === chatId);
      if (existingChat) {
        setActiveChat(existingChat);
      }
    }
  }, [chatId, chats]);

  // Reset conversation if needed or track page changes
  useEffect(() => {
    if (resetConversation) {
      const newChat: Chat = {
        id: Date.now().toString(),
        name: `Chat ${chats.length + 1}`,
        messages: [generateInitialMessage(pageName)],
        lastUpdated: new Date(),
        createdAt: new Date(),
        page: pageName
      };
      
      setActiveChat(newChat);
      setChats(prev => [...prev, newChat]);
      
      // Notify parent component of new chat ID
      if (onChatChange) {
        onChatChange(newChat.id);
      }
    } else {
      // Update active chat's page if it changed
      if (activeChat.page !== pageName) {
        const updatedChat = {
          ...activeChat,
          page: pageName
        };
        setActiveChat(updatedChat);
        
        // Update this chat in the chats array
        setChats(prev => prev.map(chat => 
          chat.id === activeChat.id ? updatedChat : chat
        ));
      }
    }
  }, [resetConversation, pageName]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCreateNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      const newChat: Chat = {
        id: Date.now().toString(),
        name: `Chat ${chats.length + 1}`,
        messages: [generateInitialMessage(pageName)],
        lastUpdated: new Date(),
        createdAt: new Date(),
        page: pageName
      };
      
      setActiveChat(newChat);
      setChats(prev => [...prev, newChat]);
      
      // Notify parent component of new chat ID
      if (onChatChange) {
        onChatChange(newChat.id);
      }
    }
  };

  const updateActiveChat = (messages: Message[]) => {
    const updatedChat = {
      ...activeChat,
      messages,
      lastUpdated: new Date()
    };
    
    setActiveChat(updatedChat);
    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id ? updatedChat : chat
    ));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    const updatedMessages = [...activeChat.messages, userMessage];
    updateActiveChat(updatedMessages);
    
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response with appropriate data for RV warranty dashboard
    setTimeout(() => {
      const contextualResponses = [
        `Based on the ${pageName} data, the most common warranty claim is related to water damage in ceiling panels, accounting for 24% of all claims this quarter.`,
        `Looking at the ${pageName}, the Freedom Deluxe 3200 model has the highest claim rate in the past month, with 36 new warranty filings.`,
        `According to the ${pageName} charts, the average time to resolve electrical system claims is 5.2 days, which is 15% faster than last quarter.`,
        `Based on the ${pageName} data, warranty claims for refrigerator issues have decreased by 15% since last quarter, likely due to the supplier change implemented in January.`,
        `The ${pageName} shows Mountain Motors dealership has the highest warranty claim resolution satisfaction rating at 92%, while Highway Haven has the lowest at 76%.`,
        `According to the ${pageName} trends, we may see an increase in HVAC-related claims as we approach summer, typically peaking in July.`,
        `The ${pageName} data indicates the Nomad Trail model has shown a 22% reduction in transmission-related claims after the recent recall and fix.`,
        `Customer satisfaction scores for warranty repairs have improved by 12% across all dealerships this quarter, as shown in the ${pageName} charts.`,
        `The ${pageName} overview shows the average cost per warranty claim has decreased to $342, down from $389 in the previous year.`,
        `According to our predictive model in the ${pageName} section, we should prepare for an increase in electrical system claims for the Venture Elite models manufactured between March and April.`
      ];
      
      const randomResponse = contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      updateActiveChat([...updatedMessages, assistantMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleSwitchChat = (chat: Chat) => {
    setActiveChat(chat);
    
    // Notify parent component of chat ID change
    if (onChatChange) {
      onChatChange(chat.id);
    }
  };

  // Create a better chat name based on first user message
  const getChatName = (chat: Chat): string => {
    const firstUserMessage = chat.messages.find(m => m.role === 'user');
    if (firstUserMessage) {
      const content = firstUserMessage.content;
      return content.length > 25 ? content.substring(0, 25) + '...' : content;
    }
    return chat.name;
  };

  // Handle sharing/downloading the conversation
  const handleShareConversation = () => {
    // Format the conversation
    const formattedConversation = activeChat.messages.map(msg => {
      const role = msg.role === 'assistant' ? 'Warranty AI' : 'You';
      const time = new Date(msg.timestamp).toLocaleString();
      return `${role} (${time}):\n${msg.content}\n\n`;
    }).join('');
    
    const header = `Warranty AI Conversation - ${new Date(activeChat.lastUpdated).toLocaleDateString()}\n`;
    const pageInfo = `Page: ${activeChat.page}\n\n`;
    const fullText = header + pageInfo + formattedConversation;
    
    // Create blob and download
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `warranty-conversation-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success toast
    toast({
      title: "Conversation Downloaded",
      description: "Your conversation has been saved as a text file.",
      duration: 3000,
    });
  };

  const openDeleteDialog = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatToDelete(chatId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteChat = () => {
    if (!chatToDelete) return;
    
    // Remove chat from the list
    const updatedChats = chats.filter(chat => chat.id !== chatToDelete);
    setChats(updatedChats);
    
    // If the active chat was deleted, set a new active chat
    if (activeChat.id === chatToDelete) {
      if (updatedChats.length > 0) {
        setActiveChat(updatedChats[0]);
        
        // Notify parent component of chat ID change
        if (onChatChange) {
          onChatChange(updatedChats[0].id);
        }
      } else {
        // Create a new chat if all were deleted
        handleCreateNewChat();
      }
    }
    
    setIsDeleteDialogOpen(false);
    setChatToDelete(null);
    
    toast({
      title: "Chat Deleted",
      description: "The conversation has been removed.",
      duration: 3000,
    });
  };

  const handleToggleThreads = () => {
    const newShowThreads = !showLocalThreads;
    setShowLocalThreads(newShowThreads);
    
    if (onToggleThreads) {
      onToggleThreads();
    }
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar for chat threads */}
      <div className={`bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col ${showLocalThreads ? 'w-1/3' : 'w-0'}`}>
        {showLocalThreads && (
          <div className="flex flex-col h-full">
            <div className="p-3 flex flex-col h-full overflow-hidden">
              <div className="flex items-center gap-1 mb-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 flex items-center justify-center gap-1 new-chat-button chat-button-gradient"
                        onClick={handleCreateNewChat}
                      >
                        <MessageSquarePlus size={14} />
                        <span className="text-xs">New Chat</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Start a new chat</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* ScrollArea for threads with proper height constraints */}
              <ScrollArea className="flex-1">
                <div className="mt-3 space-y-3 pr-2">
                  {Object.entries(groupedChats).map(([dateGroup, dateChats]) => (
                    <div key={dateGroup} className="mb-2">
                      <h3 className="text-xs uppercase text-gray-500 font-medium mb-1 px-2">{dateGroup}</h3>
                      <div className="space-y-1">
                        {dateChats.map((chat) => (
                          <div key={chat.id} 
                            className={`flex items-center justify-between group w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                              chat.id === activeChat.id 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div 
                              className="flex-1 cursor-pointer overflow-hidden"
                              onClick={() => handleSwitchChat(chat)}
                            >
                              <div className="flex items-start">
                                <Bot size={14} className="mt-0.5 mr-2 flex-shrink-0" />
                                <div className="overflow-hidden">
                                  <p className="truncate font-medium">{getChatName(chat)}</p>
                                  <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                    <span>{format(new Date(chat.lastUpdated), 'h:mm a')}</span>
                                    <span className="mx-1">·</span>
                                    <span>{chat.page}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => openDeleteDialog(chat.id, e)}
                            >
                              <Trash2 size={14} className="text-gray-500 hover:text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Share button pinned at the bottom */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 mt-auto bg-gray-50 dark:bg-gray-900 z-10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShareConversation}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Share2 size={14} />
                      <span className="text-xs">Share Conversation</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Download this conversation as a text file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="space-y-4">
            {activeChat.messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-sidebar text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                  style={{
                    boxShadow: message.role === 'user' ? '0 2px 8px rgba(0, 102, 255, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-1">
                      <Bot size={16} className="mr-1 text-blue-500" />
                      <span className="text-xs font-medium">Warranty AI</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <Bot size={16} className="mr-1 text-blue-500" />
                    <span className="text-xs font-medium">Warranty AI</span>
                  </div>
                  <div className="flex space-x-1 mt-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="px-3 py-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0 bg-transparent border-gray-200 dark:border-gray-800 z-10"
                      onClick={handleToggleThreads}
                    >
                      <SidebarIcon size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{showLocalThreads ? 'Hide threads' : 'Show threads'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0 bg-transparent border-gray-200 dark:border-gray-800 z-10"
                      onClick={handleCreateNewChat}
                    >
                      <MessageSquarePlus size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>New chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about warranty data..." 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border-gray-200 dark:border-gray-800"
            />
            
            <Button 
              onClick={handleSend} 
              size="icon" 
              disabled={isThinking}
              className="flex-shrink-0 chat-button-gradient relative z-10"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Chat Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this conversation? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteChat}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
