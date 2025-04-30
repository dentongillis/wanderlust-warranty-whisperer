
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
}

// Create a chat storage for persisting chats
const chatsStorageKey = "warranty-ai-chats";

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  lastUpdated: Date;
  createdAt: Date;
  page?: string;
}

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

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ 
  onClose, 
  onMinimize, 
  resetConversation = false, 
  chatId,
  onNewChat 
}) => {
  const location = useLocation();
  const pageName = getPageNameFromPath(location.pathname);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
    return chat;
  });

  // Update local storage whenever chats change
  useEffect(() => {
    localStorage.setItem(chatsStorageKey, JSON.stringify(chats));
  }, [chats]);

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
  };

  return (
    <div className="flex flex-col h-full">
      {/* New Chat Button */}
      <div className="mb-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full flex items-center justify-center text-xs font-medium text-white hover:text-blue-300 hover:bg-white/10 transition-colors"
          onClick={handleCreateNewChat}
        >
          <RefreshCw size={14} className="mr-2" />
          New Chat
        </Button>
      </div>
      
      {/* Chat Threads Selection - if more than 1 chat exists */}
      {chats.length > 1 && (
        <div className="mb-3 max-h-24 overflow-y-auto border-b border-gray-700 pb-2 custom-scrollbar">
          <p className="text-xs text-gray-400 mb-1 px-1">Your chats</p>
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className={`flex items-center justify-between text-xs p-1 rounded cursor-pointer truncate ${
                chat.id === activeChat.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
              onClick={() => handleSwitchChat(chat)}
            >
              <div className="flex items-center space-x-1 overflow-hidden">
                <Bot size={12} />
                <span className="truncate">{chat.name}</span>
              </div>
              <span className="text-[10px] text-gray-400">
                {new Date(chat.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto mb-4 pr-1 custom-scrollbar">
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
      
      <div className="mt-auto flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask about warranty data..." 
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border-gray-300 dark:border-gray-600 focus:ring-blue-300 dark:focus:ring-blue-700"
        />
        <Button 
          onClick={handleSend} 
          size="icon" 
          disabled={isThinking}
          className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};
