
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Move, RefreshCw } from 'lucide-react';
import { AIChatAssistant } from './AIChatAssistant';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DraggableAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  resetConversation?: boolean;
  onNewChat?: () => void;
}

export const DraggableAIChat: React.FC<DraggableAIChatProps> = ({ 
  isOpen, 
  onClose, 
  resetConversation = false,
  onNewChat 
}) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 4 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate new position
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Limit the position to stay within window bounds
    const maxX = window.innerWidth - (chatRef.current?.offsetWidth || 320);
    const maxY = window.innerHeight - (chatRef.current?.offsetHeight || 500);
    
    setPosition({
      x: Math.min(Math.max(0, newX), maxX),
      y: Math.min(Math.max(0, newY), maxY),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    
    // Calculate new position
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;

    // Limit the position to stay within window bounds
    const maxX = window.innerWidth - (chatRef.current?.offsetWidth || 320);
    const maxY = window.innerHeight - (chatRef.current?.offsetHeight || 500);
    
    setPosition({
      x: Math.min(Math.max(0, newX), maxX),
      y: Math.min(Math.max(0, newY), maxY),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <Card 
      ref={chatRef}
      className={`absolute shadow-lg dark:shadow-blue-900/20 rounded-lg w-[320px] h-[500px] max-h-[80vh] flex flex-col z-50 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <CardHeader 
        className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-t-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className="flex items-center cursor-grab active:cursor-grabbing w-full" 
        >
          <Move size={16} className="mr-2 text-white/80" />
          <CardTitle className="text-sm font-medium">Warranty AI Assistant</CardTitle>
        </div>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-1 text-white hover:bg-white/20 hover:text-white" 
                  onClick={onNewChat}
                >
                  <RefreshCw size={16} />
                  <span className="sr-only">New Chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>New Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-1 text-white hover:bg-white/20 hover:text-white" 
            onClick={onClose}
          >
            <X size={16} />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <div className="flex-1 p-3 overflow-hidden backdrop-blur-md dark:bg-gray-800/90">
        <AIChatAssistant onClose={onClose} resetConversation={resetConversation} />
      </div>
    </Card>
  );
};
