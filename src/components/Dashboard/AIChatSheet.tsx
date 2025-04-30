
import React, { useState } from 'react';
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
}

export function AIChatSheet({ children }: AIChatSheetProps) {
  const [open, setOpen] = useState(false);
  const [resetConversation, setResetConversation] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [activeChat, setActiveChat] = useState<string | undefined>(undefined);
  const [showThreads, setShowThreads] = useState(true);
  const { toast } = useToast();
  
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      setMinimized(false);
      toast({
        title: "AI Assistant Activated",
        description: "Ask questions about your warranty data and get insights",
        duration: 3000,
      });
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

  return (
    <>
      <div onClick={toggleChat}>
        {children}
      </div>
      
      {/* Minimized Chat Bubble */}
      {minimized && (
        <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
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
      />
    </>
  );
}
