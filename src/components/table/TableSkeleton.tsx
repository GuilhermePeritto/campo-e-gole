
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  showHeader?: boolean;
}

const TableSkeleton = ({ columns = 5, rows = 8, showHeader = true }: TableSkeletonProps) => {
  return (
    <div className="flex-1 overflow-x-auto h-full">
      <Table className="[&_td]:border-border [&_th]:border-border table-fixed border-separate border-spacing-0">
        {showHeader && (
          <TableHeader className="bg-background/90 sticky top-0 z-10">
            <TableRow className="hover:bg-transparent">
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index} className="h-10">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex} className="h-12">
                  <Skeleton className="h-4 w-full max-w-[120px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
