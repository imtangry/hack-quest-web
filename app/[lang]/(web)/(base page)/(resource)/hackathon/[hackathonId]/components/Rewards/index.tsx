'use client';
import React, { useContext, useMemo } from 'react';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Box from '../components/Box';

interface RewardsProp {
  hackathon: HackathonType;
}

const Rewards: React.FC<RewardsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const rewards = useMemo(() => {
    return hackathon.rewards?.map((v) => {
      const total = v.place.reduce((pre, next) => {
        return pre + next;
      }, 0);
      return {
        ...v,
        total
      };
    });
  }, [hackathon]);
  if (!hackathon.rewards?.length) return null;
  return (
    <div>
      <Title title={t('hackathonDetail.rewards')} />
      <div className="flex flex-col gap-[32px]">
        {rewards.map((v, i) => (
          <div className="flex flex-col gap-[8px]" key={i}>
            <p className="text-h4 text-neutral-rich-gray">{v.name}</p>
            <p className="body-m text-ring">{v.desc}</p>
            <Box className="flex items-center px-[60px] py-[32px] text-neutral-off-black">
              <div className="text-center">
                <p className=" text-h2 mb-[12px]">{v.total} USD</p>
                <p className="body-l text-neutral-medium-gray">
                  {t('hackathonDetail.trackTotalReward', {
                    track: v.name
                  })}
                </p>
              </div>
              <div className="flex  flex-1 justify-center self-stretch ">
                <div className="h-full w-[1px] bg-neutral-light-gray"></div>
              </div>

              <div className="body-xl flex w-[42%] flex-col gap-[12px] [&>div]:flex [&>div]:items-center [&>div]:justify-between ">
                <div>
                  <span className="body-m text-neutral-medium-gray">{t('hackathonDetail.firstPlace')}</span>
                  <span>{v.place?.[0] || 0} USD</span>
                </div>
                <div>
                  <span className="body-m text-neutral-medium-gray">{t('hackathonDetail.secondPlace')}</span>
                  <span>{v.place?.[1] || 0} USD</span>
                </div>
                <div>
                  <span className="body-m text-neutral-medium-gray">{t('hackathonDetail.thirdPlace')}</span>
                  <span>{v.place?.[2] || 0} USD</span>
                </div>
              </div>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
