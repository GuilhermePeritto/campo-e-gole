
import { Skeleton } from '@/components/ui/skeleton';

interface ValueSkeletonProps {
  className?: string;
  width?: string;
}

const ValueSkeleton = ({ className = '', width = 'w-20' }: ValueSkeletonProps) => {
  return (
    <Skeleton className={`h-6 ${width} ${className}`} />
  );
};

export default ValueSkeleton;
