'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import BlogBannerBg from '@/public/images/blog/blog_banner_bg.svg';
import { PiSortAscendingBold, PiSortDescendingBold } from 'react-icons/pi';
import { BiSearch, BiCheck } from 'react-icons/bi';
import { searchTabData, sortData } from '../../constants/data';
import { FiX } from 'react-icons/fi';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import { useRouter } from 'next-nprogress-bar';
import { cloneDeep } from 'lodash-es';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { getSearchParamsUrl } from '@/helper/utils';
import { HiArrowLongRight } from 'react-icons/hi2';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface BannerProp {
  searchParams: BlogSearchType;
}

const BlogBanner: React.FC<BannerProp> = ({ searchParams }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const router = useRouter();
  const [searchInfo, setSearchInfo] = useState<BlogSearchType>({});
  const [inputVisible, setInputVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isInit = useRef(true);

  function changeSearchInfo(searchInfo: BlogSearchType) {
    const url = getSearchParamsUrl(searchInfo, MenuLink.BLOG);
    router.push(url);
  }

  const changeSearch = (val: string) => {
    if (val === searchInfo.category) return;
    changeSearchInfo({
      ...searchInfo,
      category: val
    });
  };
  const changeSort = (sort: string) => {
    setSortVisible(false);
    if (sort === searchInfo.sort) return;
    changeSearchInfo({
      ...searchInfo,
      sort
    });
  };
  const changeInput = (e: any) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      changeSearchInfo({
        ...searchInfo,
        keyword: newKeyword
      });
    }, 1000);
  };

  const changeInputVisible = () => {
    setInputVisible(!inputVisible);
    setKeyword('');
    changeSearchInfo({
      ...searchInfo,
      keyword: ''
    });
  };

  useEffect(() => {
    const newSearchInfo = cloneDeep(searchParams);
    newSearchInfo.sort = newSearchInfo.sort || sortData[0].value;
    newSearchInfo.category = newSearchInfo.category || searchTabData[0].value;
    newSearchInfo.keyword = newSearchInfo.keyword || '';
    const { category } = newSearchInfo;
    const index = searchTabData.findIndex((v) => v.value === category);
    setCurrentIndex(index);
    setSearchInfo(newSearchInfo);
    setKeyword(newSearchInfo.keyword);
    setInputVisible(!!newSearchInfo.keyword);
    setTimeout(() => {
      isInit.current = false;
    }, 1000);
  }, [searchParams]);

  useEffect(() => {
    if (inputVisible && !isInit.current) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  return (
    <>
      <div className="relative z-[10] bg-neutral-off-white">
        <div
          className="body-l container  mx-auto h-[400px] pb-[40px] pt-[60px] text-neutral-off-black"
          style={{
            backgroundImage: `url(${BlogBannerBg.src})`,
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container mx-auto flex h-full flex-col justify-between">
            <div className="flex flex-col gap-[20px]">
              <h1 className="text-h2">{t('blog')}</h1>
              <p className="body-l w-[686px] text-neutral-rich-gray">{t('blogDescription')}</p>

              <Link
                target="_blank"
                href="https://xsxo494365r.typeform.com/to/RwN08ht9"
                className="body-m relative flex w-fit cursor-pointer items-center gap-[7px] text-neutral-off-black"
              >
                <span>{t('contributeBlog')}</span>
                <HiArrowLongRight size={16}></HiArrowLongRight>
                <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-[2px] bg-yellow-dark"></div>
              </Link>
            </div>
            <div className="flex h-[60px] w-full items-center justify-between rounded-[100px] bg-neutral-white px-[30px] text-neutral-black">
              {!inputVisible && (
                <div className="flex items-center gap-[30px]">
                  <div
                    tabIndex={0}
                    className={`relative cursor-pointer rounded-[100px] px-[20px] py-[6px] ${
                      sortVisible ? 'bg-neutral-light-gray text-neutral-medium-gray' : 'text-neutral-black'
                    }`}
                    onClick={() => setSortVisible(!sortVisible)}
                    onBlur={() => {
                      setTimeout(() => {
                        setSortVisible(false);
                      }, 0);
                    }}
                  >
                    {searchInfo.sort === sortData[0].value ? (
                      <PiSortAscendingBold size={32} />
                    ) : (
                      <PiSortDescendingBold size={32} />
                    )}

                    {sortVisible && (
                      <div className="body-s absolute bottom-[-100px] left-0 overflow-hidden rounded-[10px] bg-neutral-off-white text-neutral-black shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                        {sortData.map((v) => (
                          <div
                            key={v.value}
                            onClick={() => changeSort(v.value)}
                            className={`flex h-[40px] items-center px-[20px] ${searchInfo.sort === v.value ? 'bg-neutral-light-gray' : ''}`}
                          >
                            <div className="mr-[30px] whitespace-nowrap">{v.label}</div>
                            {searchInfo.sort === v.value && <BiCheck size={24} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <SlideHighlight
                    className="flex items-center text-[18px] "
                    type={'BLOG_FILTER'}
                    currentIndex={currentIndex}
                  >
                    {searchTabData.map((v, i) => (
                      <div
                        key={v.value}
                        className={`${
                          v.value !== 'empty'
                            ? `relative cursor-pointer rounded-[100px] px-[20px] py-[7px] ${
                                searchInfo.category === v.value ? 'text-neutral-black' : ''
                              }`
                            : 'h-[41px] w-[30px]'
                        }`}
                        style={
                          v.value === 'empty'
                            ? {
                                background:
                                  'linear-gradient(to left, var(--neutral-white) 14px,var(--neutral-black) 1px,var(--neutral-white) 15px)'
                              }
                            : {}
                        }
                        onClick={(e) => {
                          if (v.value === 'empty') {
                            e.stopPropagation();
                            return;
                          }
                          changeSearch(v.value);
                        }}
                      >
                        {v.label}
                      </div>
                    ))}
                  </SlideHighlight>
                </div>
              )}
              <div className={` flex items-center ${inputVisible ? 'flex-1 justify-between' : ''}`}>
                {inputVisible ? (
                  <>
                    <input
                      type="text"
                      className="h-[38px] flex-1 bg-[transparent] text-[24px] outline-none"
                      placeholder="Search"
                      value={keyword}
                      onInput={changeInput}
                      ref={inputRef}
                    />
                    <FiX size={32} className="cursor-pointer" onClick={changeInputVisible} />
                  </>
                ) : (
                  <div onClick={() => setInputVisible(true)} className="flex cursor-pointer  items-center">
                    <span className="mr-[6px] text-[24px]">Search</span>
                    <BiSearch size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-[9] h-full w-full bg-neutral-black opacity-50 ${!keyword && inputVisible ? 'block' : 'hidden'}`}
      ></div>
    </>
  );
};

export default BlogBanner;
