import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Mic, 
  Volume2, 
  Filter, 
  Languages,
  Users,
  Info
} from 'lucide-react';

export function SettingsSidebar() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Audio Settings</h2>
        </div>

        {/* Audio Input Settings */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-text-primary">Audio Input</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sample-rate" className="text-sm font-medium">Sample Rate</Label>
              <Select defaultValue="44100">
                <SelectTrigger>
                  <SelectValue placeholder="Select sample rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16000">16 kHz</SelectItem>
                  <SelectItem value="22050">22.05 kHz</SelectItem>
                  <SelectItem value="44100">44.1 kHz</SelectItem>
                  <SelectItem value="48000">48 kHz</SelectItem>
                  <SelectItem value="96000">96 kHz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bit-depth" className="text-sm font-medium">Bit Depth</Label>
              <Select defaultValue="16">
                <SelectTrigger>
                  <SelectValue placeholder="Select bit depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16">16-bit</SelectItem>
                  <SelectItem value="24">24-bit</SelectItem>
                  <SelectItem value="32">32-bit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Processing Settings */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-text-primary">Processing</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="noise-reduction" className="text-sm font-medium">Noise Reduction</Label>
                <p className="text-xs text-text-tertiary">Remove background noise</p>
              </div>
              <Switch id="noise-reduction" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="echo-cancellation" className="text-sm font-medium">Echo Cancellation</Label>
                <p className="text-xs text-text-tertiary">Reduce echo and reverb</p>
              </div>
              <Switch id="echo-cancellation" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                Noise Gate Threshold
                <Badge variant="secondary" className="text-xs">dB</Badge>
              </Label>
              <Slider
                defaultValue={[-40]}
                max={0}
                min={-80}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-tertiary">
                <span>-80 dB</span>
                <span>0 dB</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Speaker Identification */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-text-primary">Speaker ID</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="speaker-verification" className="text-sm font-medium">Speaker Verification</Label>
                <p className="text-xs text-text-tertiary">Verify against known speakers</p>
              </div>
              <Switch id="speaker-verification" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Minimum Speaker Duration</Label>
              <Select defaultValue="2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5 seconds</SelectItem>
                  <SelectItem value="1">1 second</SelectItem>
                  <SelectItem value="2">2 seconds</SelectItem>
                  <SelectItem value="5">5 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Speaker Similarity Threshold</Label>
              <Slider
                defaultValue={[75]}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-tertiary">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-text-primary">Language</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Target Languages</Label>
              <Select defaultValue="auto">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-translate" className="text-sm font-medium">Auto-translate to English</Label>
                <p className="text-xs text-text-tertiary">Automatically translate non-English segments</p>
              </div>
              <Switch id="auto-translate" defaultChecked />
            </div>
          </div>
        </Card>

        {/* Output Settings */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-text-primary">Output</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="timestamps" className="text-sm font-medium">Include Timestamps</Label>
                <p className="text-xs text-text-tertiary">Add timestamps to transcript</p>
              </div>
              <Switch id="timestamps" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="confidence-scores" className="text-sm font-medium">Confidence Scores</Label>
                <p className="text-xs text-text-tertiary">Show confidence for each word</p>
              </div>
              <Switch id="confidence-scores" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Export Format</Label>
              <Select defaultValue="json">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="txt">Plain Text</SelectItem>
                  <SelectItem value="srt">SRT Subtitles</SelectItem>
                  <SelectItem value="vtt">WebVTT</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}