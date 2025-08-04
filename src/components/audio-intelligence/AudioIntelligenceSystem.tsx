import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  Users, 
  Languages, 
  Mic, 
  FileText,
  Settings,
  Clock,
  CheckCircle,
  Loader2,
  FileAudio,
  MoreVertical,
  Moon,
  Sun
} from 'lucide-react';
import { UploadPanel } from './UploadPanel';
import { SettingsSidebar } from './SettingsSidebar';
import { ProcessingTimeline } from './ProcessingTimeline';
import { TranscriptPanel } from './TranscriptPanel';
import { TranslationPanel } from './TranslationPanel';
import { PlaybackControls } from './PlaybackControls';
import { StatusIndicators } from './StatusIndicators';

interface ProcessingStage {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  icon: React.ReactNode;
}

export default function AudioIntelligenceSystem() {
  const { theme, setTheme } = useTheme();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<string>('upload');
  const [showSettings, setShowSettings] = useState(true);
  
  const processingStages: ProcessingStage[] = [
    {
      id: 'upload',
      name: 'File Upload',
      status: uploadedFile ? 'completed' : 'pending',
      progress: uploadedFile ? 100 : 0,
      icon: <Upload className="h-4 w-4" />
    },
    {
      id: 'speaker-id',
      name: 'Speaker Identification',
      status: isProcessing && currentStage === 'speaker-id' ? 'processing' : 'pending',
      progress: currentStage === 'speaker-id' ? 65 : 0,
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'diarization',
      name: 'Speaker Diarization',
      status: 'pending',
      progress: 0,
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'language-id',
      name: 'Language Identification',
      status: 'pending',
      progress: 0,
      icon: <Languages className="h-4 w-4" />
    },
    {
      id: 'asr',
      name: 'Speech Recognition',
      status: 'pending',
      progress: 0,
      icon: <Mic className="h-4 w-4" />
    },
    {
      id: 'translation',
      name: 'Translation',
      status: 'pending',
      progress: 0,
      icon: <FileText className="h-4 w-4" />
    }
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate processing start
    setTimeout(() => {
      setIsProcessing(true);
      setCurrentStage('speaker-id');
    }, 1000);
  };

  const simulateProcessing = () => {
    // This would be replaced with actual API calls
    setIsProcessing(true);
    setCurrentStage('speaker-id');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileAudio className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-text-primary">Audio Intelligence</h1>
            </div>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="gap-2"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Settings Sidebar */}
        {showSettings && (
          <div className="w-80 border-r border-border bg-sidebar">
            <SettingsSidebar />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Status Bar */}
          <div className="border-b border-border bg-surface/30 px-6 py-3">
            <StatusIndicators stages={processingStages} currentStage={currentStage} />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full p-6 space-y-6">
              {/* Upload Section */}
              {!uploadedFile && (
                <div className="flex items-center justify-center h-full">
                  <UploadPanel onFileUpload={handleFileUpload} />
                </div>
              )}

              {/* Processing & Results */}
              {uploadedFile && (
                <div className="h-full flex flex-col space-y-6">
                  {/* File Info */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-subtle rounded-lg flex items-center justify-center">
                          <FileAudio className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-text-primary">{uploadedFile.name}</h3>
                          <p className="text-sm text-text-secondary">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • 
                            {uploadedFile.type.split('/')[1].toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      {isProcessing ? (
                        <div className="flex items-center gap-2 text-processing">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm font-medium">Processing...</span>
                        </div>
                      ) : (
                        <Button onClick={simulateProcessing} className="gap-2">
                          <Play className="h-4 w-4" />
                          Start Processing
                        </Button>
                      )}
                    </div>
                  </Card>

                  {/* Timeline */}
                  <Card className="p-4">
                    <h3 className="font-medium text-text-primary mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Processing Timeline
                    </h3>
                    <ProcessingTimeline />
                  </Card>

                  {/* Results Grid */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Transcript Panel */}
                    <Card className="flex flex-col">
                      <div className="p-4 border-b border-border bg-card-header">
                        <h3 className="font-medium text-text-primary flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          Transcript
                        </h3>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <TranscriptPanel />
                      </div>
                    </Card>

                    {/* Translation Panel */}
                    <Card className="flex flex-col">
                      <div className="p-4 border-b border-border bg-card-header">
                        <h3 className="font-medium text-text-primary flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          Translation (English)
                        </h3>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <TranslationPanel />
                      </div>
                    </Card>
                  </div>

                  {/* Playback Controls */}
                  <Card className="p-4">
                    <PlaybackControls fileName={uploadedFile.name} />
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}