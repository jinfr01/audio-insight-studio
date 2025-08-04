import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Languages, 
  Mic,
  Clock
} from 'lucide-react';

interface TimelineSegment {
  id: string;
  startTime: number;
  endTime: number;
  speaker: string;
  language: string;
  type: 'speech' | 'silence' | 'noise';
  confidence: number;
}

export function ProcessingTimeline() {
  // Mock data - would come from actual processing
  const segments: TimelineSegment[] = [
    { id: '1', startTime: 0, endTime: 5.2, speaker: 'Speaker 1', language: 'en', type: 'speech', confidence: 0.95 },
    { id: '2', startTime: 5.2, endTime: 5.8, speaker: '', language: '', type: 'silence', confidence: 1.0 },
    { id: '3', startTime: 5.8, endTime: 12.1, speaker: 'Speaker 2', language: 'es', type: 'speech', confidence: 0.87 },
    { id: '4', startTime: 12.1, endTime: 12.5, speaker: '', language: '', type: 'silence', confidence: 1.0 },
    { id: '5', startTime: 12.5, endTime: 18.3, speaker: 'Speaker 1', language: 'en', type: 'speech', confidence: 0.92 },
    { id: '6', startTime: 18.3, endTime: 25.7, speaker: 'Speaker 3', language: 'fr', type: 'speech', confidence: 0.78 },
  ];

  const totalDuration = Math.max(...segments.map(s => s.endTime));
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
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

  const getLanguageFlag = (language: string) => {
    const flags: Record<string, string> = {
      'en': '🇺🇸',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'it': '🇮🇹',
      'pt': '🇵🇹',
      'ru': '🇷🇺',
      'zh': '🇨🇳',
      'ja': '🇯🇵',
      'ko': '🇰🇷'
    };
    return flags[language] || '🌐';
  };

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-text-primary">
            Total Duration: {formatTime(totalDuration)}
          </span>
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            {new Set(segments.filter(s => s.speaker).map(s => s.speaker)).size} Speakers
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Languages className="h-3 w-3" />
            {new Set(segments.filter(s => s.language).map(s => s.language)).size} Languages
          </Badge>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Time markers */}
        <div className="flex justify-between text-xs text-text-tertiary mb-2">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>
              {formatTime((totalDuration / 5) * i)}
            </span>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative h-16 bg-surface-muted rounded-lg overflow-hidden border border-border">
          {segments.map((segment) => {
            const leftPercent = (segment.startTime / totalDuration) * 100;
            const widthPercent = ((segment.endTime - segment.startTime) / totalDuration) * 100;
            
            return (
              <div
                key={segment.id}
                className={`
                  absolute top-0 h-full group cursor-pointer transition-all duration-200
                  ${segment.type === 'speech' 
                    ? 'hover:scale-y-110 hover:z-10' 
                    : 'opacity-30'
                  }
                `}
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                  backgroundColor: segment.type === 'speech' 
                    ? getSpeakerColor(segment.speaker)
                    : segment.type === 'silence'
                      ? 'hsl(var(--surface-muted))'
                      : 'hsl(var(--warning))',
                }}
              >
                {/* Hover tooltip */}
                {segment.type === 'speech' && (
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity">
                    <div className="bg-popover border border-border rounded-lg shadow-medium p-3 text-xs whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span className="font-medium">{segment.speaker}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{getLanguageFlag(segment.language)}</span>
                          <span>{segment.language.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(segment.startTime)} - {formatTime(segment.endTime)}</span>
                        </div>
                        <div className="text-text-tertiary">
                          Confidence: {(segment.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Playhead (simulated) */}
        <div 
          className="absolute top-0 w-0.5 h-16 bg-destructive shadow-glow transition-all duration-100"
          style={{ left: '25%' }}
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-destructive rounded-full"></div>
        </div>
      </div>

      {/* Speaker Legend */}
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(segments.filter(s => s.speaker).map(s => s.speaker))).map((speaker) => (
          <div key={speaker} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-border"
              style={{ backgroundColor: getSpeakerColor(speaker) }}
            />
            <span className="text-sm text-text-secondary">{speaker}</span>
          </div>
        ))}
      </div>
    </div>
  );
}