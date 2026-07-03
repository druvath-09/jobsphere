import { useState } from 'react';
import type { CompanyLogo as CompanyLogoModel } from '../model/company';
import { cn } from '@/shared/lib/utils';

interface CompanyLogoAvatarProps {
  logo?: CompanyLogoModel | undefined;
  fallbackInitial: string;
  fallbackColor?: string;
  className?: string;
  imageClassName?: string;
}

function CompanyLogoAvatar({
  logo,
  fallbackInitial,
  fallbackColor = '#475569',
  className,
  imageClassName,
}: CompanyLogoAvatarProps) {
  const [failed, setFailed] = useState(false);
  const logoPath = logo?.path;
  const canShowLogo = Boolean(logoPath) && !failed;
  const backgroundColor = logo?.color ?? fallbackColor;

  return (
    <span
      className={cn('overflow-hidden', className)}
      style={{ backgroundColor }}
      aria-hidden="true"
    >
      {canShowLogo ? (
        <img
          src={logoPath}
          alt=""
          className={cn('h-full w-full object-cover', imageClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        fallbackInitial
      )}
    </span>
  );
}

export { CompanyLogoAvatar };
