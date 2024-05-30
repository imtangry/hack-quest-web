'use client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useRef } from 'react';
import { useTranslation } from '@/i18n/client';
import DeveloperCover from '@/public/images/learn/develpoer_cover.png';
import { BiSearch } from 'react-icons/bi';
import { LangContext } from '@/components/Provider/Lang';

interface IndexProp {
  keyword?: string;
  searchKeyword: (key: string) => void;
}

const Index: React.FC<IndexProp> = ({ keyword, searchKeyword }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const search = (val: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      searchKeyword(val);
    }, 1000);
  };
  return (
    <div
      className="flex-center bg-no-repeat px-[1.25rem] py-[2.5rem]"
      style={{
        backgroundImage: `url(${DeveloperCover.src})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-col items-center gap-[2.5rem] ">
        <h1 className="text-h1-mob w-[21.875rem] text-center text-neutral-black">{t('explore.title')}</h1>
        <div className="flex h-[3.125rem] w-full items-center gap-[1.25rem] rounded-[3.5rem] border border-neutral-light-gray bg-neutral-white px-[1.25rem]">
          <BiSearch size={24} className="flex-shrink-0" />
          <input
            className="body-m boder-none flex-1 outline-none"
            placeholder={t('searchPlaceholder')}
            onChange={(e) => {
              const value = e.target.value;
              search(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
