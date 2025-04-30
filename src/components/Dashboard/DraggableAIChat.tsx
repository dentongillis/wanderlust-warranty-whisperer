
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, RefreshCw } from 'lucide-react';
import { AIChatAssistant } from './AIChatAssistant';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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
  const [dimensions, setDimensions] = useState({ width: 320, height: 500 });
  const chatRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't start dragging if clicking on buttons or input
    if (
      e.target instanceof HTMLElement && 
      (e.target.closest('button') || 
       e.target.closest('input') || 
       e.target.tagName === 'BUTTON' || 
       e.target.tagName === 'INPUT')
    ) {
      return;
    }
    
    if (chatRef.current) {
      e.preventDefault(); // Prevent text selection
      const rect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      document.body.classList.add('select-none'); // Prevent text selection during drag
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent text selection
    
    // Calculate new position without any delay
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove('select-none'); // Restore text selection
  };

  // Add touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Don't start dragging if touching buttons or input
    if (
      e.target instanceof HTMLElement && 
      (e.target.closest('button') || 
       e.target.closest('input') || 
       e.target.tagName === 'BUTTON' || 
       e.target.tagName === 'INPUT')
    ) {
      return;
    }
    
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
      setIsDragging(true);
      document.body.classList.add('select-none'); // Prevent text selection during drag
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent default behavior including text selection
    
    const touch = e.touches[0];
    
    // Set position directly without any delay
    setPosition({
      x: touch.clientX - dragOffset.x,
      y: touch.clientY - dragOffset.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.body.classList.remove('select-none'); // Restore text selection
  };

  // Update dimensions when ResizablePanel is resized
  const handleResize = () => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height
      });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
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
      document.body.classList.remove('select-none'); // Clean up
    };
  }, [isDragging]);

  // Monitor size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (chatRef.current) {
      resizeObserver.observe(chatRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={chatRef}
      className={`absolute shadow-lg dark:shadow-blue-900/20 rounded-lg z-50 transition-opacity duration-300 resize-chat ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        minWidth: '280px',
        minHeight: '300px',
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <ResizablePanelGroup 
        direction="vertical" 
        className="h-full rounded-lg overflow-hidden border-0"
      >
        <div
          className="p-3 border-b flex flex-row items-center justify-between space-y-0 bg-sidebar text-white rounded-t-lg"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <CardTitle className="text-sm font-medium select-none">Warranty AI Assistant</CardTitle>
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
        </div>
        
        <ResizablePanel defaultSize={100} minSize={30} className="h-full">
          <div className="flex-1 p-3 overflow-hidden backdrop-blur-md dark:bg-gray-800/90 h-full">
            <AIChatAssistant onClose={onClose} resetConversation={resetConversation} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* Resize handles for all sides */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize resize-handle resize-handle-br" 
           onMouseDown={(e) => {
             e.stopPropagation();
             e.preventDefault(); // Prevent text selection
             const startX = e.clientX;
             const startY = e.clientY;
             const startWidth = dimensions.width;
             const startHeight = dimensions.height;
             
             const handleMouseMove = (e: MouseEvent) => {
               e.preventDefault(); // Prevent text selection
               const newWidth = Math.max(280, startWidth + (e.clientX - startX));
               const newHeight = Math.max(300, startHeight + (e.clientY - startY));
               
               setDimensions({
                 width: newWidth,
                 height: newHeight
               });
             };
             
             const handleMouseUp = () => {
               document.removeEventListener('mousemove', handleMouseMove);
               document.removeEventListener('mouseup', handleMouseUp);
               document.body.classList.remove('select-none');
             };
             
             document.body.classList.add('select-none'); // Prevent text selection during resize
             document.addEventListener('mousemove', handleMouseMove, { passive: false });
             document.addEventListener('mouseup', handleMouseUp);
           }}
      >
        <div className="w-0 h-0 border-b-4 border-r-4 border-gray-400 absolute bottom-0 right-0"></div>
      </div>

      {/* Bottom resize handle */}
      <div className="absolute bottom-0 left-4 right-4 h-1 cursor-ns-resize resize-handle resize-handle-b"
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const startY = e.clientY;
          const startHeight = dimensions.height;
          
          const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const newHeight = Math.max(300, startHeight + (e.clientY - startY));
            
            setDimensions({
              ...dimensions,
              height: newHeight
            });
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('select-none');
          };
          
          document.body.classList.add('select-none');
          document.addEventListener('mousemove', handleMouseMove, { passive: false });
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="h-1 w-full bg-transparent hover:bg-gray-400/20"></div>
      </div>
      
      {/* Right resize handle */}
      <div className="absolute top-4 bottom-4 right-0 w-1 cursor-ew-resize resize-handle resize-handle-r"
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const startX = e.clientX;
          const startWidth = dimensions.width;
          
          const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const newWidth = Math.max(280, startWidth + (e.clientX - startX));
            
            setDimensions({
              ...dimensions,
              width: newWidth
            });
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('select-none');
          };
          
          document.body.classList.add('select-none');
          document.addEventListener('mousemove', handleMouseMove, { passive: false });
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="w-1 h-full bg-transparent hover:bg-gray-400/20"></div>
      </div>
      
      {/* Left resize handle */}
      <div className="absolute top-4 bottom-4 left-0 w-1 cursor-ew-resize resize-handle resize-handle-l"
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const startX = e.clientX;
          const startLeft = position.x;
          const startWidth = dimensions.width;
          
          const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const dx = startX - e.clientX;
            const newWidth = Math.max(280, startWidth + dx);
            const newLeft = startLeft - (newWidth - startWidth);
            
            setPosition({
              ...position,
              x: newLeft
            });
            
            setDimensions({
              ...dimensions,
              width: newWidth
            });
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('select-none');
          };
          
          document.body.classList.add('select-none');
          document.addEventListener('mousemove', handleMouseMove, { passive: false });
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="w-1 h-full bg-transparent hover:bg-gray-400/20"></div>
      </div>
      
      {/* Top resize handle */}
      <div className="absolute top-0 left-4 right-4 h-1 cursor-ns-resize resize-handle resize-handle-t"
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const startY = e.clientY;
          const startTop = position.y;
          const startHeight = dimensions.height;
          
          const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const dy = startY - e.clientY;
            const newHeight = Math.max(300, startHeight + dy);
            const newTop = startTop - (newHeight - startHeight);
            
            setPosition({
              ...position,
              y: newTop
            });
            
            setDimensions({
              ...dimensions,
              height: newHeight
            });
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('select-none');
          };
          
          document.body.classList.add('select-none');
          document.addEventListener('mousemove', handleMouseMove, { passive: false });
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="h-1 w-full bg-transparent hover:bg-gray-400/20"></div>
      </div>
    </div>
  );
};
