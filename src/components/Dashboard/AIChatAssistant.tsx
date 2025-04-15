
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, Bot, User, XIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your RV Warranty Analysis Assistant. You can ask me questions about warranty data, claims, trends, or specific RV models."
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: inputValue }];
    setMessages(newMessages);
    setInputValue('');
    
    // Simulate AI response (would connect to OpenAI API in production)
    setIsLoading(true);
    
    setTimeout(() => {
      let responseText = "I'm analyzing the warranty data based on your query. In a production environment, I would connect to OpenAI with context about your RV warranty data to provide a detailed analysis.";
      
      // Some sample responses based on common queries
      if (inputValue.toLowerCase().includes('top claim')) {
        responseText = "Based on the current data, the most common warranty claim is for water damage to ceiling panels, accounting for 18% of all claims. This is followed by electrical system failures (15%) and HVAC system issues (12%).";
      } else if (inputValue.toLowerCase().includes('model')) {
        responseText = "The Freedom Deluxe 3200 currently has the highest number of warranty claims with 45 active claims. The average cost per claim for this model is $3,280, which is 28% higher than the overall average.";
      } else if (inputValue.toLowerCase().includes('trend')) {
        responseText = "Warranty claims have increased by 12% compared to the same period last year. However, the average processing time has improved by 23%, from 6.8 days to 5.2 days.";
      }
      
      setMessages([...newMessages, { role: 'assistant', content: responseText }]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">AI Warranty Assistant</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px]">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex max-w-[80%] ${message.role === 'user' 
                  ? 'flex-row-reverse' 
                  : 'flex-row'}`}
              >
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-2' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div 
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row">
                <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2 bg-secondary text-secondary-foreground">
                  <Bot size={16} />
                </div>
                <div className="rounded-lg px-4 py-2 bg-accent text-accent-foreground">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Separator />
        <div className="p-4 flex">
          <Input
            className="flex-1 mr-2"
            placeholder="Ask about warranty trends, claims, or specific RV models..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button disabled={isLoading} onClick={handleSendMessage}>
            <SendIcon size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
