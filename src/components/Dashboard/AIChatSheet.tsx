
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { DraggableAIChat } from './DraggableAIChat';

interface AIChatSheetProps {
  children: React.ReactNode;
}

export function AIChatSheet({ children }: AIChatSheetProps) {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <div onClick={toggleChat}>
        {children}
      </div>
      <DraggableAIChat 
        isOpen={open} 
        onClose={() => handleOpenChange(false)}
      />
    </>
  );
}
