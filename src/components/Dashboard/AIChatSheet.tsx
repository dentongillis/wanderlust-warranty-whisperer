import React, { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { DraggableAIChat } from './DraggableAIChat';
import { MessageSquarePlus, SidebarIcon, Bot } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

interface AIChatSheetProps {
  children: React.ReactNode;
  initialQuery?: string;
}

// Create a shared storage key for chat history
const chatsStorageKey = "warranty-ai-chats";

// Function to get the latest chat ID
export const getLatestChatId = (): string | undefined => {
  const stored = localStorage.getItem(chatsStorageKey);
  if (!stored) return undefined;
  
  const chats = JSON.parse(stored);
  if (!chats || chats.length === 0) return undefined;
  
  // Sort by lastUpdated and get the most recent one, but only consider saved chats
  const savedChats = chats.filter((chat: any) => chat.saved === true);
  if (savedChats.length === 0) return undefined;
  
  const sortedChats = [...savedChats].sort((a: any, b: any) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  
  return sortedChats[0]?.id;
};

export function AIChatSheet({ children, initialQuery }: AIChatSheetProps) {
  const [open, setOpen] = useState(false);
  const [resetConversation, setResetConversation] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [activeChat, setActiveChat] = useState<string | undefined>(undefined);
  const [showThreads, setShowThreads] = useState(true);
  const [initialMessage, setInitialMessage] = useState<string | undefined>(initialQuery);
  const { toast } = useToast();
  
  // Extract search query if children is an input element
  useEffect(() => {
    if (React.isValidElement(children) && children.type === 'input') {
      const inputElement = children as React.ReactElement<HTMLInputElement>;
      if (inputElement.props.value) {
        setInitialMessage(inputElement.props.value);
      }
    }
  }, [children]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      setMinimized(false);
      
      // If there's an initial query, start a new chat
      if (initialMessage) {
        setResetConversation(true);
        setTimeout(() => setResetConversation(false), 100);
      } else {
        toast({
          title: "AI Assistant Activated",
          description: "Ask questions about your warranty data and get insights",
          duration: 3000,
        });
      }
    }
  };

  const handleMinimize = () => {
    setMinimized(true);
  };

  const toggleChat = () => {
    if (minimized) {
      setMinimized(false);
    } else {
      handleOpenChange(!open);
    }
  };

  const handleNewChat = () => {
    setResetConversation(true);
    setTimeout(() => setResetConversation(false), 100);
    if (minimized) {
      setMinimized(false);
    }
    if (!open) {
      handleOpenChange(true);
    }
  };

  const toggleThreads = () => {
    setShowThreads(!showThreads);
    if (minimized) {
      setMinimized(false);
    }
    if (!open) {
      handleOpenChange(true);
    }
  };

  // Extract search query if it's an input element
  const getSearchQuery = (): string | undefined => {
    if (React.isValidElement(children) && children.type === 'input') {
      const inputProps = (children as React.ReactElement<any>).props;
      return inputProps.value;
    }
    return undefined;
  };

  const handleClick = () => {
    const query = getSearchQuery();
    if (query) {
      setInitialMessage(query);
    }
    toggleChat();
  };

  return (
    <>
      <div onClick={handleClick}>
        {children}
      </div>
      
      {/* Minimized Chat Bubble */}
      {minimized && (
        <div className="fixed bottom-4 right-4 flex space-x-2" style={{ zIndex: 9998 }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-gradient-to-r from-sidebar to-sidebar-accent text-white rounded-full p-2.5 shadow-lg cursor-pointer hover:from-sidebar-accent hover:to-sidebar transition-all"
                  onClick={toggleThreads}
                >
                  <SidebarIcon size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle chat threads</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-gradient-to-r from-sidebar to-sidebar-accent text-white rounded-full p-2.5 shadow-lg cursor-pointer hover:from-sidebar-accent hover:to-sidebar transition-all"
                  onClick={handleNewChat}
                >
                  <MessageSquarePlus size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>New chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="bg-gradient-to-r from-sidebar to-sidebar-accent text-white rounded-full p-2.5 shadow-lg cursor-pointer hover:from-sidebar-accent hover:to-sidebar transition-all"
                  onClick={toggleChat}
                >
                  <Bot size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Open chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      <DraggableAIChat 
        isOpen={open && !minimized} 
        onClose={() => handleOpenChange(false)}
        onMinimize={handleMinimize}
        resetConversation={resetConversation}
        onNewChat={handleNewChat}
        chatId={activeChat}
        onChatChange={setActiveChat}
        showThreads={showThreads}
        onToggleThreads={() => setShowThreads(!showThreads)}
        initialMessage={initialMessage}
      />
    </>
  );
}
