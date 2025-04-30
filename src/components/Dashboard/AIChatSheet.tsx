
import React, { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { AIChatAssistant } from './AIChatAssistant';
import { useToast } from "@/hooks/use-toast";

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

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-md w-[90%]">
        <SheetHeader>
          <SheetTitle>Warranty AI Assistant</SheetTitle>
        </SheetHeader>
        <div className="h-full py-4 flex flex-col">
          <AIChatAssistant onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
