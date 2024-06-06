'use client';

import { cn } from '@/helper/utils';
import { ClientOnly } from '@/hooks/dom/useIsClient';
import { useCountDown } from 'ahooks';

export function HackathonCountdown({
  targetDate,
  className
}: {
  targetDate?: string | number | Date | null;
  className?: string;
}) {
  const [_, formattedRes] = useCountDown({
    targetDate
  });

  const { days, hours, minutes, seconds } = formattedRes;
  return (
    <ClientOnly>
      <div className={cn('flex items-center', className)}>
        <span className="rounded bg-neutral-off-white px-2 py-1 font-bold text-neutral-rich-gray">
          {days < 10 ? `0${days}` : days}
        </span>
        <span className="pl-1 pr-3">D</span>
        <span className="rounded bg-neutral-off-white px-2 py-1 font-bold text-neutral-rich-gray">
          {hours < 10 ? `0${hours}` : hours}
        </span>
        <span className="pl-1 pr-3">H</span>
        <span className="rounded bg-neutral-off-white px-2 py-1 font-bold text-neutral-rich-gray">
          {minutes < 10 ? `0${minutes}` : minutes}
        </span>
        <span className="pl-1 pr-3">M</span>
        <span className="rounded bg-neutral-off-white px-2 py-1 font-bold text-neutral-rich-gray">
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
        <span className="pl-1 pr-3">S</span>
      </div>
    </ClientOnly>
  );
}