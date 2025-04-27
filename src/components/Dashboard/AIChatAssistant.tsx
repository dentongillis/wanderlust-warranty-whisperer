
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const AIChatAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your RV warranty assistant. Ask me anything about warranty claims, trends, or statistics."
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on our data, the most common warranty claim is related to water damage in ceiling panels.",
        "The Freedom Deluxe 3200 model has the highest claim rate in the past month.",
        "The average time to resolve electrical system claims is 5.2 days.",
        "Warranty claims for refrigerator issues have decreased by 15% since last quarter.",
        "Based on historical patterns, we may see an increase in HVAC-related claims as we approach summer."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, 1000);
    
    setInput('');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">AI Warranty Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask about warranty data..." 
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
