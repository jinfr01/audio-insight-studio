import React, { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  FileAudio, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UploadPanelProps {
  onFileUpload: (file: File) => void;
}

const ACCEPTED_FORMATS = ['.wav', '.mp3', '.ogg', '.flac', '.m4a'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export function UploadPanel({ onFileUpload }: UploadPanelProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!ACCEPTED_FORMATS.includes(extension)) {
      return `File type not supported. Please use: ${ACCEPTED_FORMATS.join(', ')}`;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`;
    }
    
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onFileUpload(file);
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card 
        className={`
          relative border-2 border-dashed transition-all duration-200 ease-smooth
          ${isDragOver 
            ? 'border-primary bg-primary-subtle shadow-glow' 
            : 'border-border hover:border-border-hover'
          }
          ${error ? 'border-destructive bg-destructive-subtle' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center space-y-6">
          {/* Icon */}
          <div className={`
            w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors
            ${error 
              ? 'bg-destructive text-destructive-foreground' 
              : isDragOver 
                ? 'bg-primary text-primary-foreground animate-pulse-glow' 
                : 'bg-surface-muted text-text-tertiary'
            }
          `}>
            {error ? (
              <AlertCircle className="h-8 w-8" />
            ) : (
              <FileAudio className="h-8 w-8" />
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-text-primary">
              {error ? 'Upload Error' : 'Upload Audio File'}
            </h3>
            
            {error ? (
              <div className="space-y-2">
                <p className="text-destructive font-medium">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear Error
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-text-secondary">
                  Drag and drop your audio file here, or click to browse
                </p>
                
                {/* Upload Button */}
                <div className="space-y-3">
                  <label htmlFor="file-upload">
                    <Button 
                      type="button"
                      className="gap-2 cursor-pointer"
                      size="lg"
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept={ACCEPTED_FORMATS.join(',')}
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Format Info */}
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-text-tertiary">
                    Supported formats: {ACCEPTED_FORMATS.join(', ')}
                  </p>
                  <p className="text-sm text-text-tertiary">
                    Maximum file size: {MAX_FILE_SIZE / 1024 / 1024}MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Features Preview */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <CheckCircle className="h-5 w-5" />, label: 'Speaker ID' },
          { icon: <CheckCircle className="h-5 w-5" />, label: 'Diarization' },
          { icon: <CheckCircle className="h-5 w-5" />, label: 'Language ID' },
          { icon: <CheckCircle className="h-5 w-5" />, label: 'Translation' },
        ].map((feature, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 p-3 rounded-lg bg-surface-subtle border border-border"
          >
            <div className="text-success">
              {feature.icon}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}