import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Download, 
  Copy, 
  User, 
  Clock,
  Volume2,
  CheckCircle
} from 'lucide-react';

interface TranscriptSegment {
  id: string;
  speaker: string;
  startTime: number;
  endTime: number;
  text: string;
  confidence: number;
  language: string;
  words: Array<{
    text: string;
    startTime: number;
    endTime: number;
    confidence: number;
  }>;
}

export function TranscriptPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  // Mock transcript data
  const transcript: TranscriptSegment[] = [
    {
      id: '1',
      speaker: 'Speaker 1',
      startTime: 0,
      endTime: 5.2,
      text: "Welcome to today's meeting. I'd like to start by reviewing our quarterly progress and discussing the upcoming product launch.",
      confidence: 0.95,
      language: 'en',
      words: [
        { text: 'Welcome', startTime: 0, endTime: 0.5, confidence: 0.98 },
        { text: 'to', startTime: 0.5, endTime: 0.7, confidence: 0.99 },
        // ... more words would be here
      ]
    },
    {
      id: '2',
      speaker: 'Speaker 2',
      startTime: 5.8,
      endTime: 12.1,
      text: "Gracias por la introducción. Los resultados del último trimestre han superado nuestras expectativas iniciales.",
      confidence: 0.87,
      language: 'es',
      words: []
    },
    {
      id: '3',
      speaker: 'Speaker 1',
      startTime: 12.5,
      endTime: 18.3,
      text: "That's excellent news! Could you walk us through the specific metrics that performed particularly well?",
      confidence: 0.92,
      language: 'en',
      words: []
    },
    {
      id: '4',
      speaker: 'Speaker 3',
      startTime: 18.3,
      endTime: 25.7,
      text: "Bien sûr, je vais présenter les données de vente par région et les taux de conversion client.",
      confidence: 0.78,
      language: 'fr',
      words: []
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSpeakerColor = (speaker: string) => {
    const colors = [
      'hsl(200, 95%, 50%)',
      'hsl(280, 65%, 55%)', 
      'hsl(140, 70%, 45%)',
      'hsl(35, 90%, 55%)',
      'hsl(320, 75%, 55%)'
    ];
    const index = parseInt(speaker.replace('Speaker ', '')) - 1;
    return colors[index] || colors[0];
  };

  const getLanguageInfo = (language: string) => {
    const languages: Record<string, { name: string; flag: string }> = {
      'en': { name: 'English', flag: '🇺🇸' },
      'es': { name: 'Spanish', flag: '🇪🇸' },
      'fr': { name: 'French', flag: '🇫🇷' },
      'de': { name: 'German', flag: '🇩🇪' },
    };
    return languages[language] || { name: 'Unknown', flag: '🌐' };
  };

  const filteredTranscript = transcript.filter(segment =>
    segment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyTranscript = () => {
    const text = transcript
      .map(segment => `[${formatTime(segment.startTime)}] ${segment.speaker}: ${segment.text}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const jumpToTime = (time: number) => {
    // This would integrate with the audio player
    console.log('Jump to time:', time);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Controls */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <Input
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" onClick={copyTranscript} className="gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span>{transcript.length} segments</span>
          <span>{new Set(transcript.map(s => s.speaker)).size} speakers</span>
          <span>{new Set(transcript.map(s => s.language)).size} languages</span>
        </div>
      </div>

      {/* Transcript Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {filteredTranscript.map((segment) => {
            const languageInfo = getLanguageInfo(segment.language);
            const isSelected = selectedSegment === segment.id;
            
            return (
              <div
                key={segment.id}
                className={`
                  group rounded-lg border transition-all duration-200 cursor-pointer
                  ${isSelected 
                    ? 'border-primary bg-primary-subtle shadow-glow' 
                    : 'border-border bg-surface hover:border-border-hover hover:shadow-subtle'
                  }
                `}
                onClick={() => setSelectedSegment(isSelected ? null : segment.id)}
              >
                {/* Segment Header */}
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    {/* Speaker Avatar */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ backgroundColor: getSpeakerColor(segment.speaker) }}
                    >
                      <User className="h-4 w-4" />
                    </div>
                    
                    {/* Speaker Info */}
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">
                        {segment.speaker}
                      </span>
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <span>{languageInfo.flag}</span>
                        <span>{languageInfo.name}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Time & Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        jumpToTime(segment.startTime);
                      }}
                      className="gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Volume2 className="h-3 w-3" />
                      Play
                    </Button>
                    
                    <div className="flex items-center gap-1 text-xs text-text-tertiary">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(segment.startTime)}</span>
                    </div>
                    
                    {/* Confidence indicator */}
                    <div className="flex items-center gap-1">
                      <CheckCircle 
                        className={`h-3 w-3 ${
                          segment.confidence > 0.9 
                            ? 'text-success' 
                            : segment.confidence > 0.7 
                              ? 'text-warning' 
                              : 'text-destructive'
                        }`} 
                      />
                      <span className="text-xs text-text-tertiary">
                        {(segment.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transcript Text */}
                <div className="p-3">
                  <p className="text-text-primary leading-relaxed">
                    {segment.text}
                  </p>
                  
                  {/* Duration info */}
                  <div className="mt-2 text-xs text-text-tertiary">
                    {formatTime(segment.startTime)} - {formatTime(segment.endTime)} 
                    <span className="ml-2">
                      ({(segment.endTime - segment.startTime).toFixed(1)}s)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTranscript.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-text-tertiary">No results found for "{searchQuery}"</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}