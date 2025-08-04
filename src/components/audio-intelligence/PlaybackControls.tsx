import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  Download,
  Share,
  MoreHorizontal
} from 'lucide-react';

interface PlaybackControlsProps {
  fileName: string;
}

export function PlaybackControls({ fileName }: PlaybackControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([25]);
  const [currentTime, setCurrentTime] = useState(65); // seconds
  const [totalTime] = useState(300); // seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    setIsPlaying(false);
    setProgress([0]);
    setCurrentTime(0);
  };

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    setProgress([(newTime / totalTime) * 100]);
  };

  const skipForward = () => {
    const newTime = Math.min(totalTime, currentTime + 10);
    setCurrentTime(newTime);
    setProgress([(newTime / totalTime) * 100]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value);
    setCurrentTime((value[0] / 100) * totalTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (value[0] > 0) setIsMuted(false);
  };

  return (
    <div className="space-y-4">
      {/* File Info */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-medium text-text-primary">{fileName}</h4>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>{formatTime(currentTime)} / {formatTime(totalTime)}</span>
            <Badge variant="secondary" className="text-xs">
              {playbackSpeed}x
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={progress}
          onValueChange={handleProgressChange}
          max={100}
          step={0.1}
          className="w-full cursor-pointer"
        />
        
        {/* Time markers */}
        <div className="flex justify-between text-xs text-text-tertiary">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>
              {formatTime((totalTime / 5) * i)}
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Left side - Playback controls */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={skipBackward}
            className="gap-1"
          >
            <SkipBack className="h-4 w-4" />
            <span className="text-xs">10s</span>
          </Button>
          
          <Button 
            onClick={togglePlayPause}
            size="sm"
            className="gap-2 px-4"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={stop}
          >
            <Square className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={skipForward}
            className="gap-1"
          >
            <span className="text-xs">10s</span>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Center - Playback speed */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={cyclePlaybackSpeed}
            className="gap-1"
          >
            <span className="text-xs font-mono">{playbackSpeed}x</span>
          </Button>
          
          <Button variant="ghost" size="sm">
            <Repeat className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>

        {/* Right side - Volume controls */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleMute}
          >
            {isMuted || volume[0] === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <div className="flex items-center gap-2 min-w-[120px]">
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-20"
            />
            <span className="text-xs text-text-tertiary w-8">
              {isMuted ? 0 : volume[0]}%
            </span>
          </div>
        </div>
      </div>

      {/* Playback Status */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-2 text-sm text-processing">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-processing animate-pulse"></div>
            <div className="w-1 h-3 bg-processing animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-3 bg-processing animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span>Playing audio...</span>
        </div>
      )}
    </div>
  );
}