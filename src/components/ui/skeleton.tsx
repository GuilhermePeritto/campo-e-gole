import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
}

function Skeleton({
  className,
  show = true,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted transition-opacity duration-400",
        show ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      style={{
        ...style,
        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
      aria-hidden="true"
      {...props}
    />
  )
}

export { Skeleton };

