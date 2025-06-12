
import React from 'react';
import { Button } from '@/components/ui/button';
import ExportButton from '@/components/ExportButton';

interface CreateButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface BaseListHeaderProps {
  title: string;
  description?: string;
  showExport?: boolean;
  exportData?: any[];
  exportFilename?: string;
  createButton?: CreateButtonProps;
}

const BaseListHeader: React.FC<BaseListHeaderProps> = ({
  title,
  description,
  showExport = false,
  exportData = [],
  exportFilename,
  createButton
}) => {
  return (
    <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {showExport && (
          <ExportButton 
            data={exportData} 
            filename={exportFilename || title.toLowerCase().replace(/\s+/g, '-')}
            title={title}
          />
        )}
        {createButton && (
          <Button 
            onClick={createButton.onClick}
            className="gap-2"
          >
            {createButton.icon}
            {createButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BaseListHeader;
