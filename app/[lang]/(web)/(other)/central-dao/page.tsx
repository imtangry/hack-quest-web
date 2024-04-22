import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { Metadata } from 'next';
import React from 'react';
import CentralBanner from './components/CentralBanner';
import Introduction from './components/Introduction';
import PrizeTrack from './components/PrizeTrack';
import Schedule from './components/Schedule';
import Judges from './components/Judges';
import Partners from './components/Partners';
import Count from './components/Count';
import Degalaxy from './components/Degalaxy';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.CENTRAL_DAO}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.CENTRAL_DAO}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.CENTRAL_DAO}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.CENTRAL_DAO}`
      }
    }
  };
}

interface CentralDaoProp {}

const CentralDao: React.FC<CentralDaoProp> = () => {
  return (
    <div className="bg-[#13121F] pb-[147px] font-Poppins text-[16px] text-neutral-off-white">
      <CentralBanner />
      <div className="container mx-auto flex flex-col gap-[120px]">
        <Count />
        <Degalaxy />
      </div>

      <div className="mx-auto flex w-[808px] flex-col gap-[120px] pt-[120px]">
        <Introduction />
        <PrizeTrack />
        <Schedule />
        <Judges />
        <Partners />
      </div>
    </div>
  );
};

export default CentralDao;
