// CareerSuggestionPage.jsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AI_API_END_POINT } from '@/utils/constant';

const CareerSuggestionPage = () => {
  const [education, setEducation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  const getSuggestions = async () => {
    const response = await fetch(`${AI_API_END_POINT}/career-suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ education })
    });
    const data = await response.json();
    setSuggestions(data.suggestions);
    setChatStarted(true);
  };

  const sendMessage = async () => {
    const newChat = [...chatHistory, { role: 'user', content: message }];
    setChatHistory(newChat);
    setMessage('');

    const response = await fetch(`${AI_API_END_POINT}/career-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newChat })
    });

    const data = await response.json();
    setChatHistory([...newChat, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 space-y-4">
        {!chatStarted ? (
          <Card className="border-[#3b66ff] container-shadow">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-xl font-semibold text-[#3b66ff]">Start Your Career Chat</h2>
              <Input
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Enter your last/current education"
              />
              <Button onClick={getSuggestions} className="bg-[#3b66ff] hover:bg-[#9fb4ff] active:bg-black rounded-l-full rounded-r-full text-white cursor-pointer ml-[-5px]">Get Suggestions</Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-[#3b66ff] container-shadow">
            <CardContent className="space-y-2 p-4">
              <h2 className="font-bold">AI Career Suggestions</h2>
              <ul className="list-disc list-inside text-sm">
                {suggestions.map((sug, idx) => (
                  <li key={idx}>{sug}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="col-span-2">
        <Card className="h-[500px] flex flex-col border-[#3b66ff] container-shadow">
          <ScrollArea className="flex-1 p-4 space-y-2 overflow-y-auto">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-lg max-w-[80%] ${
                  msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100 self-start'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t border-[#3b66ff] flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question or choose a suggestion..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-[#3b66ff] hover:bg-[#9fb4ff] active:bg-black rounded-l-full rounded-r-full text-white cursor-pointer ml-[-5px]">Send</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CareerSuggestionPage;
