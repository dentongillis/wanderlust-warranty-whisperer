
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Move } from 'lucide-react';
import { AIChatAssistant } from './AIChatAssistant';

interface DraggableAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DraggableAIChat: React.FC<DraggableAIChatProps> = ({ isOpen, onClose }) => {
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

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <Card 
      ref={chatRef}
      className={`absolute shadow-lg rounded-lg w-[320px] h-[500px] max-h-[80vh] flex flex-col z-50 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
    >
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
        <div 
          className="flex items-center cursor-grab active:cursor-grabbing" 
          onMouseDown={handleMouseDown}
        >
          <Move size={16} className="mr-2 text-gray-500" />
          <CardTitle className="text-sm font-medium">Warranty AI Assistant</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="h-auto p-1" onClick={onClose}>
          <X size={16} />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <div className="flex-1 p-3 overflow-hidden">
        <AIChatAssistant onClose={onClose} />
      </div>
    </Card>
  );
};
