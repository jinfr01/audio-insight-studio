import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Copy, 
  Languages, 
  Clock,
  Volume2,
  CheckCircle,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface TranslationSegment {
  id: string;
  speaker: string;
  startTime: number;
  endTime: number;
  originalText: string;
  originalLanguage: string;
  translatedText: string;
  targetLanguage: string;
  confidence: number;
  translationConfidence: number;
  isTranslating?: boolean;
}

export function TranslationPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  // Mock translation data
  const translations: TranslationSegment[] = [
    {
      id: '1',
      speaker: 'Speaker 1',
      startTime: 0,
      endTime: 5.2,
      originalText: "Welcome to today's meeting. I'd like to start by reviewing our quarterly progress and discussing the upcoming product launch.",
      originalLanguage: 'en',
      translatedText: "Welcome to today's meeting. I'd like to start by reviewing our quarterly progress and discussing the upcoming product launch.",
      targetLanguage: 'en',
      confidence: 0.95,
      translationConfidence: 1.0
    },
    {
      id: '2',
      speaker: 'Speaker 2',
      startTime: 5.8,
      endTime: 12.1,
      originalText: "Gracias por la introducción. Los resultados del último trimestre han superado nuestras expectativas iniciales.",
      originalLanguage: 'es',
      translatedText: "Thank you for the introduction. The results from last quarter have exceeded our initial expectations.",
      targetLanguage: 'en',
      confidence: 0.87,
      translationConfidence: 0.92
    },
    {
      id: '3',
      speaker: 'Speaker 1',
      startTime: 12.5,
      endTime: 18.3,
      originalText: "That's excellent news! Could you walk us through the specific metrics that performed particularly well?",
      originalLanguage: 'en',
      translatedText: "That's excellent news! Could you walk us through the specific metrics that performed particularly well?",
      targetLanguage: 'en',
      confidence: 0.92,
      translationConfidence: 1.0
    },
    {
      id: '4',
      speaker: 'Speaker 3',
      startTime: 18.3,
      endTime: 25.7,
      originalText: "Bien sûr, je vais présenter les données de vente par région et les taux de conversion client.",
      originalLanguage: 'fr',
      translatedText: "Of course, I'll present the sales data by region and customer conversion rates.",
      targetLanguage: 'en',
      confidence: 0.78,
      translationConfidence: 0.85,
      isTranslating: false
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
      'it': { name: 'Italian', flag: '🇮🇹' },
      'pt': { name: 'Portuguese', flag: '🇵🇹' },
      'ru': { name: 'Russian', flag: '🇷🇺' },
      'zh': { name: 'Chinese', flag: '🇨🇳' },
      'ja': { name: 'Japanese', flag: '🇯🇵' },
      'ko': { name: 'Korean', flag: '🇰🇷' }
    };
    return languages[language] || { name: 'Unknown', flag: '🌐' };
  };

  const filteredTranslations = translations.filter(segment =>
    segment.translatedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyTranslations = () => {
    const text = translations
      .map(segment => `[${formatTime(segment.startTime)}] ${segment.speaker}: ${segment.translatedText}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const jumpToTime = (time: number) => {
    console.log('Jump to time:', time);
  };

  const translatedCount = translations.filter(t => t.originalLanguage !== t.targetLanguage).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header Controls */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <Input
              placeholder="Search translations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="es">🇪🇸 Spanish</SelectItem>
              <SelectItem value="fr">🇫🇷 French</SelectItem>
              <SelectItem value="de">🇩🇪 German</SelectItem>
              <SelectItem value="it">🇮🇹 Italian</SelectItem>
              <SelectItem value="pt">🇵🇹 Portuguese</SelectItem>
              <SelectItem value="ru">🇷🇺 Russian</SelectItem>
              <SelectItem value="zh">🇨🇳 Chinese</SelectItem>
              <SelectItem value="ja">🇯🇵 Japanese</SelectItem>
              <SelectItem value="ko">🇰🇷 Korean</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={copyTranslations} className="gap-2">
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
          <span>{translations.length} segments</span>
          <span>{translatedCount} translated</span>
          <span>{new Set(translations.map(s => s.originalLanguage)).size} source languages</span>
        </div>
      </div>

      {/* Translation Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {filteredTranslations.map((segment) => {
            const originalLang = getLanguageInfo(segment.originalLanguage);
            const targetLang = getLanguageInfo(segment.targetLanguage);
            const isSelected = selectedSegment === segment.id;
            const needsTranslation = segment.originalLanguage !== segment.targetLanguage;
            
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
                      {segment.speaker.charAt(segment.speaker.length - 1)}
                    </div>
                    
                    {/* Speaker & Language Info */}
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">
                        {segment.speaker}
                      </span>
                      
                      {needsTranslation && (
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <span>{originalLang.flag}</span>
                            <span>{originalLang.name}</span>
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-text-tertiary" />
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <span>{targetLang.flag}</span>
                            <span>{targetLang.name}</span>
                          </Badge>
                        </div>
                      )}
                      
                      {!needsTranslation && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <span>{originalLang.flag}</span>
                          <span>Original</span>
                        </Badge>
                      )}
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
                    
                    {/* Translation quality indicator */}
                    {needsTranslation && (
                      <div className="flex items-center gap-1">
                        {segment.isTranslating ? (
                          <Loader2 className="h-3 w-3 animate-spin text-processing" />
                        ) : (
                          <CheckCircle 
                            className={`h-3 w-3 ${
                              segment.translationConfidence > 0.9 
                                ? 'text-success' 
                                : segment.translationConfidence > 0.7 
                                  ? 'text-warning' 
                                  : 'text-destructive'
                            }`} 
                          />
                        )}
                        <span className="text-xs text-text-tertiary">
                          {segment.isTranslating 
                            ? 'Translating...' 
                            : `${(segment.translationConfidence * 100).toFixed(0)}%`
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Translation Content */}
                <div className="p-3 space-y-3">
                  {/* Original text (if different from translation) */}
                  {needsTranslation && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-text-tertiary">
                        <Languages className="h-3 w-3" />
                        <span>Original ({originalLang.name})</span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed pl-4 border-l-2 border-border">
                        {segment.originalText}
                      </p>
                    </div>
                  )}
                  
                  {/* Translated text */}
                  <div className="space-y-1">
                    {needsTranslation && (
                      <div className="flex items-center gap-2 text-xs text-text-tertiary">
                        <Languages className="h-3 w-3" />
                        <span>Translation ({targetLang.name})</span>
                      </div>
                    )}
                    <p className={`text-text-primary leading-relaxed ${needsTranslation ? 'pl-4 border-l-2 border-primary' : ''}`}>
                      {segment.isTranslating ? (
                        <span className="text-text-tertiary italic">Translating...</span>
                      ) : (
                        segment.translatedText
                      )}
                    </p>
                  </div>
                  
                  {/* Duration info */}
                  <div className="text-xs text-text-tertiary">
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

        {filteredTranslations.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-text-tertiary">No results found for "{searchQuery}"</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}