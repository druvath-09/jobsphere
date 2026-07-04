import { cn } from '@/shared/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className, withText = true }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary flex-shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24Z"
          fill="currentColor"
        />
        <path
          d="M16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10ZM16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20Z"
          fill="currentColor"
        />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
      {withText && (
        <span className="font-bold text-xl tracking-tight text-text-primary">
          Job<span className="text-primary">Sphere</span>
        </span>
      )}
    </Link>
  );
}
