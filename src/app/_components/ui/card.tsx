// src/app/_components/ui/card.tsx
// Reusable Card component (shadcn/ui style)
import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('bg-white rounded shadow p-4', className)} {...props}>
      {children}
    </div>
  )
);
Card.displayName = 'Card';
