'use client';

import * as React from 'react';
import { LoaderIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { LearnSection } from './learn-section';
import { BuildSection } from './build-section';
import { CommunitySection } from './community-section';
import { CardTabs } from './card-tabs';
import { useLang } from '../Provider/Lang';

const tabs = [
  { value: 'learn', label: 'Learn' },
  { value: 'build', label: 'Build' },
  { value: 'community', label: 'Community' }
];

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center py-10 sm:py-20">
      <LoaderIcon className="h-6 w-6 animate-spin text-yellow-dark" />
    </div>
  );
}

export function EcosystemContent() {
  const { lang } = useLang();

  const { ecosystemId } = useParams<{ ecosystemId: string }>();
  const [value, setValue] = React.useState('learn');

  const { isLoading, data } = useQuery({
    enabled: !!ecosystemId,
    staleTime: Infinity,
    queryKey: ['ecosystemTasks', ecosystemId, lang],
    queryFn: () => webApi.ecosystemApi.getEcosystemTasks(ecosystemId, { lang })
  });

  return (
    <div className="pb-6 pt-4 sm:pb-0 sm:pt-[3.75rem]">
      <CardTabs tabs={tabs} value={value} onValueChange={setValue} />
      <div
        className={cn('w-full rounded-2xl bg-neutral-white p-6', {
          'rounded-tl-none': value === 'learn',
          'rounded-tr-none': value === 'community'
        })}
      >
        {isLoading && <Loading />}
        {data && value === 'learn' && <LearnSection tasks={data.learn} />}
        {data && value === 'build' && <BuildSection tasks={data.build} />}
        {data && value === 'community' && <CommunitySection tasks={data.community} />}
      </div>
    </div>
  );
}
