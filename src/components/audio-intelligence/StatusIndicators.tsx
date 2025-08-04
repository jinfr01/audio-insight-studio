import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Users, 
  Languages, 
  Mic, 
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle,
  Clock
} from 'lucide-react';

interface ProcessingStage {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  icon: React.ReactNode;
}

interface StatusIndicatorsProps {
  stages: ProcessingStage[];
  currentStage: string;
}

export function StatusIndicators({ stages, currentStage }: StatusIndicatorsProps) {
  const getStageIcon = (stage: ProcessingStage) => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-processing animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-text-tertiary" />;
    }
  };

  const getStageVariant = (stage: ProcessingStage) => {
    switch (stage.status) {
      case 'completed':
        return 'default' as const;
      case 'processing':
        return 'secondary' as const;
      case 'error':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const getStageProgress = (stage: ProcessingStage) => {
    if (stage.status === 'completed') return 100;
    if (stage.status === 'processing') return stage.progress;
    return 0;
  };

  const completedStages = stages.filter(s => s.status === 'completed').length;
  const totalStages = stages.length;
  const overallProgress = (completedStages / totalStages) * 100;

  const processingStage = stages.find(s => s.status === 'processing');
  const errorStage = stages.find(s => s.status === 'error');

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Processing Progress
            </span>
            <span className="text-sm text-text-secondary">
              {completedStages} of {totalStages} stages complete
            </span>
          </div>
          <Progress 
            value={overallProgress} 
            className="h-2"
          />
        </div>
        
        {/* Overall Status Badge */}
        <Badge 
          variant={
            errorStage ? 'destructive' : 
            processingStage ? 'secondary' : 
            completedStages === totalStages ? 'default' : 
            'outline'
          }
          className="gap-2"
        >
          {errorStage ? (
            <>
              <AlertCircle className="h-3 w-3" />
              Error
            </>
          ) : processingStage ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Processing
            </>
          ) : completedStages === totalStages ? (
            <>
              <CheckCircle className="h-3 w-3" />
              Complete
            </>
          ) : (
            <>
              <Clock className="h-3 w-3" />
              Pending
            </>
          )}
        </Badge>
      </div>

      {/* Individual Stage Status */}
      <div className="flex flex-wrap gap-2">
        {stages.map((stage) => {
          const isActive = stage.id === currentStage || stage.status === 'processing';
          const progress = getStageProgress(stage);
          
          return (
            <div 
              key={stage.id}
              className={`
                relative group flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
                ${isActive 
                  ? 'border-primary bg-primary-subtle shadow-glow' 
                  : 'border-border bg-surface hover:border-border-hover'
                }
              `}
            >
              {/* Stage Icon */}
              <div className="flex items-center gap-2">
                {getStageIcon(stage)}
                <span className="text-sm font-medium text-text-primary">
                  {stage.name}
                </span>
              </div>

              {/* Progress Indicator for Active Stage */}
              {stage.status === 'processing' && progress > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-surface-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-processing transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-tertiary">
                    {progress}%
                  </span>
                </div>
              )}

              {/* Hover Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity pointer-events-none">
                <div className="bg-popover border border-border rounded-lg shadow-medium p-2 text-xs whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="font-medium">{stage.name}</div>
                    <div className="text-text-tertiary">
                      Status: {stage.status}
                      {stage.status === 'processing' && ` (${progress}%)`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Stage Details */}
      {processingStage && (
        <div className="p-3 rounded-lg bg-processing-subtle border border-processing">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-processing animate-spin" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-text-primary">
                  {processingStage.name} in progress
                </span>
                <span className="text-sm text-text-secondary">
                  {processingStage.progress}%
                </span>
              </div>
              <Progress 
                value={processingStage.progress} 
                className="h-1.5"
              />
            </div>
          </div>
        </div>
      )}

      {/* Error Details */}
      {errorStage && (
        <div className="p-3 rounded-lg bg-destructive-subtle border border-destructive">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
              <div className="font-medium text-text-primary">
                Error in {errorStage.name}
              </div>
              <div className="text-sm text-text-secondary">
                Processing failed. Please try again or check your file.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}