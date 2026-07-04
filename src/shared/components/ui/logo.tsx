import { cn } from '@/shared/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <img
        src="/logo.png"
        alt="JobSphere Logo"
        className="h-8 w-8 object-contain flex-shrink-0 rounded-md"
      />
      {withText && (
        <span className="font-bold text-xl tracking-tight text-text-primary">
          Job<span className="text-primary">Sphere</span>
        </span>
      )}
    </Link>
  );
}
