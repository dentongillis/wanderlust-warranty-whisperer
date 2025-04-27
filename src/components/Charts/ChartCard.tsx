
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Maximize2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChartCardProps {
  title: string;
  description?: string;
  infoText?: string;
  children: ReactNode;
  className?: string;
  downloadable?: boolean;
  fullscreenable?: boolean;
  onDownload?: () => void;
  onFullscreen?: () => void;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  infoText,
  children,
  className = '',
  downloadable = true,
  fullscreenable = true,
  onDownload,
  onFullscreen,
}) => {
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {infoText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                      <Info size={14} />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{infoText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex space-x-1">
          {downloadable && (
            <Button variant="ghost" size="icon" onClick={onDownload} className="h-8 w-8">
              <Download size={16} />
              <span className="sr-only">Download</span>
            </Button>
          )}
          {fullscreenable && (
            <Button variant="ghost" size="icon" onClick={onFullscreen} className="h-8 w-8">
              <Maximize2 size={16} />
              <span className="sr-only">Fullscreen</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
    </Card>
  );
};
