
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { DraggableAIChat } from './DraggableAIChat';

interface AIChatSheetProps {
  children: React.ReactNode;
}

export function AIChatSheet({ children }: AIChatSheetProps) {
  const [open, setOpen] = useState(false);
  const [resetConversation, setResetConversation] = useState(false);
  const { toast } = useToast();
  
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      toast({
        title: "AI Assistant Activated",
        description: "Ask questions about your warranty data and get insights",
        duration: 3000,
      });
    }
  };

  const toggleChat = () => {
    handleOpenChange(!open);
  };

  const startNewChat = () => {
    setResetConversation(true);
    handleOpenChange(true);
    
    // Reset the flag after a brief delay to ensure it's processed
    setTimeout(() => {
      setResetConversation(false);
    }, 100);
  };

  return (
    <>
      <div className="flex space-x-1">
        <div onClick={toggleChat}>
          {children}
        </div>
        <Button 
          variant="outline" 
          className="text-xs py-1 px-2 h-auto"
          onClick={startNewChat}
        >
          New Chat
        </Button>
      </div>
      <DraggableAIChat 
        isOpen={open} 
        onClose={() => handleOpenChange(false)}
        resetConversation={resetConversation}
      />
    </>
  );
}
