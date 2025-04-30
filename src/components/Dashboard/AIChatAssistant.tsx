
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, RefreshCw } from 'lucide-react';

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Thread = {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
};

const initialMessage: Message = {
  role: "assistant",
  content: "Hello! I'm your RV warranty assistant. Ask me anything about warranty claims, trends, or statistics.",
  timestamp: new Date(),
};

// Create global variables to persist threads and current thread
let persistedThreads: Thread[] = [];
let persistedCurrentThreadId: string | null = null;

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Create a new thread
const createNewThread = (): Thread => {
  return {
    id: generateId(),
    name: `Chat ${persistedThreads.length + 1}`,
    messages: [{ ...initialMessage }],
    createdAt: new Date(),
  };
};

// Initialize with one thread if none exists
if (persistedThreads.length === 0) {
  persistedThreads = [createNewThread()];
  persistedCurrentThreadId = persistedThreads[0].id;
}

interface AIChatAssistantProps {
  onClose?: () => void;
  onMinimize?: () => void;
  resetConversation?: boolean;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ 
  onClose, 
  onMinimize,
  resetConversation = false 
}) => {
  const [input, setInput] = useState('');
  const [threads, setThreads] = useState<Thread[]>(persistedThreads);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(persistedCurrentThreadId);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current thread messages
  const currentThread = threads.find(t => t.id === currentThreadId) || threads[0];
  const messages = currentThread?.messages || [];

  // Reset conversation if needed
  useEffect(() => {
    if (resetConversation && currentThreadId) {
      const newThreads = [...threads];
      const threadIndex = newThreads.findIndex(t => t.id === currentThreadId);
      
      if (threadIndex !== -1) {
        newThreads[threadIndex].messages = [{ ...initialMessage }];
        setThreads(newThreads);
        persistedThreads = newThreads;
      }
    }
  }, [resetConversation]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update persisted state when threads or currentThreadId change
  useEffect(() => {
    persistedThreads = [...threads];
    persistedCurrentThreadId = currentThreadId;
  }, [threads, currentThreadId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim() || !currentThreadId) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    const updatedThreads = [...threads];
    const threadIndex = updatedThreads.findIndex(t => t.id === currentThreadId);
    
    if (threadIndex !== -1) {
      updatedThreads[threadIndex].messages = [...updatedThreads[threadIndex].messages, userMessage];
      setThreads(updatedThreads);
      persistedThreads = updatedThreads;
    }
    
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response with appropriate data for RV warranty dashboard
    setTimeout(() => {
      const botResponses = [
        "Based on our data, the most common warranty claim is related to water damage in ceiling panels, accounting for 24% of all claims this quarter.",
        "The Freedom Deluxe 3200 model has the highest claim rate in the past month, with 36 new warranty filings.",
        "The average time to resolve electrical system claims is 5.2 days, which is 15% faster than last quarter.",
        "Warranty claims for refrigerator issues have decreased by 15% since last quarter, likely due to the supplier change implemented in January.",
        "Mountain Motors dealership has the highest warranty claim resolution satisfaction rating at 92%, while Highway Haven has the lowest at 76%.",
        "Based on historical patterns, we may see an increase in HVAC-related claims as we approach summer, typically peaking in July.",
        "The Nomad Trail model has shown a 22% reduction in transmission-related claims after the recent recall and fix.",
        "Customer satisfaction scores for warranty repairs have improved by 12% across all dealerships this quarter.",
        "The average cost per warranty claim has decreased to $342, down from $389 in the previous year.",
        "According to our predictive model, we should prepare for an increase in electrical system claims for the Venture Elite models manufactured between March and April."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      const finalThreads = [...updatedThreads];
      const finalThreadIndex = finalThreads.findIndex(t => t.id === currentThreadId);
      
      if (finalThreadIndex !== -1) {
        // Update thread name based on first user message if it's still the default name
        if (finalThreads[finalThreadIndex].name.startsWith('Chat ') && userMessage.content) {
          const truncatedMessage = userMessage.content.slice(0, 20) + (userMessage.content.length > 20 ? '...' : '');
          finalThreads[finalThreadIndex].name = truncatedMessage;
        }
        
        finalThreads[finalThreadIndex].messages = [...finalThreads[finalThreadIndex].messages, assistantMessage];
        setThreads(finalThreads);
        persistedThreads = finalThreads;
      }
      
      setIsThinking(false);
    }, 1500);
  };

  const createNewThreadHandler = () => {
    const newThread = createNewThread();
    setThreads(prev => [...prev, newThread]);
    setCurrentThreadId(newThread.id);
    persistedThreads = [...threads, newThread];
    persistedCurrentThreadId = newThread.id;
  };

  const switchThread = (threadId: string) => {
    setCurrentThreadId(threadId);
    persistedCurrentThreadId = threadId;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1 text-white hover:bg-white/10 hover:text-blue-300 transition-colors"
          onClick={createNewThreadHandler}
        >
          <RefreshCw size={14} />
          <span>New Chat</span>
        </Button>
      </div>
      
      {threads.length > 1 && (
        <div className="mb-4 overflow-x-auto custom-scrollbar">
          <div className="flex space-x-2">
            {threads.map((thread) => (
              <Button
                key={thread.id}
                size="sm"
                variant={currentThreadId === thread.id ? "secondary" : "outline"}
                className={`text-xs whitespace-nowrap ${
                  currentThreadId === thread.id ? "bg-sidebar-accent text-white" : "bg-transparent text-gray-600"
                }`}
                onClick={() => switchThread(thread.id)}
              >
                {thread.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto mb-4 pr-1 custom-scrollbar">
        <div className="space-y-4">
          {messages.map((message, index) => (
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
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          className="chat-header-gradient hover:opacity-90"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};
