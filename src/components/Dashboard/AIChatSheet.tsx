
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { DraggableAIChat } from './DraggableAIChat';
import { MessageSquarePlus } from 'lucide-react';

interface AIChatSheetProps {
  children: React.ReactNode;
}

export function AIChatSheet({ children }: AIChatSheetProps) {
  const [open, setOpen] = useState(false);
  const [resetConversation, setResetConversation] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [activeChat, setActiveChat] = useState<string | undefined>(undefined);
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
  };

  return (
    <>
      <div onClick={toggleChat}>
        {children}
      </div>
      
      {/* Minimized Chat Bubble */}
      {minimized && (
        <div 
          className="fixed bottom-4 right-4 bg-gradient-to-r from-sidebar to-sidebar-accent text-white rounded-full p-3 shadow-lg cursor-pointer z-50 hover:from-sidebar-accent hover:to-sidebar transition-all"
          onClick={() => setMinimized(false)}
        >
          <MessageSquarePlus size={24} />
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
