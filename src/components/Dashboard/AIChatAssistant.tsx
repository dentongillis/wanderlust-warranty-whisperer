
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello! I'm your RV warranty assistant. Ask me anything about warranty claims, trends, or statistics.",
    timestamp: new Date(),
  }
];

// Create a global variable to persist messages
let persistedMessages = [...initialMessages];

interface AIChatAssistantProps {
  onClose?: () => void;
  resetConversation?: boolean;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ onClose, resetConversation = false }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(persistedMessages);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset conversation if needed
  useEffect(() => {
    if (resetConversation) {
      setMessages(initialMessages);
      persistedMessages = [...initialMessages];
    }
  }, [resetConversation]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update persisted messages when messages change
  useEffect(() => {
    persistedMessages = [...messages];
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
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
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
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
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' 
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
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};
