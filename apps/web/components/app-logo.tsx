import Link from 'next/link';

import { cn } from '@kit/ui/utils';

/**
 * App Logo Image - modify this with your own logo
 * @param className - The class name to apply to the logo
 * @param width - The width of the logo
 * @returns
 */
export function LogoImage({
  className,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span
        className="h-3 w-3 shrink-0 rounded-full bg-[#EA580C]"
        style={{ boxShadow: '0 0 14px #EA580C' }}
        aria-hidden
      />
      <span className="font-heading text-2xl leading-none tracking-wider">
        PICKIFY
      </span>
    </span>
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string | null;
  className?: string;
  label?: string;
}) {
  if (href === null) {
    return <LogoImage className={className} />;
  }

  return (
    <Link
      aria-label={label ?? 'Home Page'}
      href={href ?? '/'}
      prefetch={true}
      className="mx-auto md:mx-0"
    >
      <LogoImage className={className} />
    </Link>
  );
}
