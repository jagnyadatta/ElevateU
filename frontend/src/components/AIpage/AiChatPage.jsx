// CareerSuggestionPage.jsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AI_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const AiChatPage = () => {
  const [education, setEducation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    if (!education.trim()) {
        toast.error("Enter Your last Education details.");
        return;
    };
    setLoading(true);

    try {
      const response = await fetch(`${AI_API_END_POINT}/career-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education }),
      });
      const data = await response.json();
      const result = data.result.candidates[0].content.parts[0].text.split(",");
    //   console.log(result);
      setSuggestions(result);
      toast.success(data.message);
    } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong");
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-start justify-center bg-gray-50">
      <Card className="w-[60%] border-[#3b66ff] container-shadow">
        <CardContent className="space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-bold text-[#3b66ff] mb-2">Get Career Suggestions</h2>
            <p className="text-sm text-gray-600">Enter your last qualification or education detail to get future career recommendations.</p>
          </div>
          <div className="flex gap-2">
            <Input
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. B.Tech in Computer Science"
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && getSuggestions()}
            />
            <Button
              onClick={getSuggestions}
              disabled={loading}
              className="bg-[#3b66ff] hover:bg-[#9fb4ff] text-white rounded-full"
            >
              {loading ? "Loading..." : "Suggest"}
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#3b66ff] mb-2">Top 15 Career Suggestions:</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                {suggestions.map((sug, idx) => (
                  <li key={idx}>{sug}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AiChatPage;
