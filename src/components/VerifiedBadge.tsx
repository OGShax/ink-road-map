import { Award, Shield, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'glow' | 'minimal';
}

export const VerifiedBadge = ({ 
  size = 'md', 
  showText = true, 
  className,
  variant = 'default'
}: VerifiedBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const getVariantProps = () => {
    switch (variant) {
      case 'glow':
        return {
          variant: 'glow' as const,
          className: 'border-primary/20 bg-primary/10 text-primary'
        };
      case 'minimal':
        return {
          variant: 'outline' as const,
          className: 'border-primary text-primary'
        };
      default:
        return {
          variant: 'secondary' as const,
          className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800'
        };
    }
  };

  const variantProps = getVariantProps();

  return (
    <Badge 
      {...variantProps}
      className={cn(
        sizeClasses[size],
        variantProps.className,
        'inline-flex items-center gap-1 font-medium',
        className
      )}
    >
      {variant === 'glow' ? (
        <Award className={cn(iconSizes[size], 'text-primary')} />
      ) : variant === 'minimal' ? (
        <CheckCircle className={cn(iconSizes[size], 'text-primary')} />
      ) : (
        <Shield className={cn(iconSizes[size], 'text-green-600 dark:text-green-400')} />
      )}
      {showText && (
        <span>
          {variant === 'glow' ? 'Premium Verified' : 'Verified'}
        </span>
      )}
    </Badge>
  );
};