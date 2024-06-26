'use client';
import BlogCard from '@/components/Web/Business/BlogCard';
import Loading from '@/components/Common/Loading';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import React, { useContext, useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/router/useRedirect';
import GlossaryCard from '@/components/Web/Business/GlossaryCard';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';

interface BlogFooterProp {
  from?: ResourceFrom;
  category?: string[];
}

const BlogFooter: React.FC<BlogFooterProp> = ({ from = ResourceFrom.BLOG, category }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [featureBlogList, setFeatureBlogList] = useState<BlogType[]>([]);
  const { redirectToUrl } = useRedirect();
  const business = useMemo(() => {
    const path = from === ResourceFrom.BLOG ? MenuLink.BLOG : MenuLink.GLOSSARY;
    const text = from === ResourceFrom.BLOG ? t('backAllBlogs') : t('backAllGlossary');
    return {
      path,
      text
    };
  }, [from]);
  const { loading } = useRequest(async () => {
    const res =
      from === ResourceFrom.BLOG
        ? await webApi.resourceStationApi.getFeaturedBlog({
            categories: category?.join(',')
          })
        : await webApi.resourceStationApi.getFeaturedGlossary({
            tracks: category?.join(',')
          });
    setFeatureBlogList(res?.slice(0, 4) || []);
  });

  const handleClick = () => {
    redirectToUrl(business.path);
  };
  return (
    <div className="w-full bg-yellow-extra-light py-[60px]">
      <div className="container mx-auto">
        <div className="mb-[30px] flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3 text-neutral-black">
              {from === ResourceFrom.BLOG
                ? `${category ? `${t('moreAboutBlog')} ’${category.join(',')}‘` : t('featuredBlog')}`
                : `${category ? `${t('moreAboutGlossary')} ’${category.join(',')}‘` : t('latestGlossary')}`}
            </h2>
          </div>
          {from === ResourceFrom.BLOG && (
            <Link
              href={business.path}
              className="body-l flex items-center gap-x-[15px] text-neutral-black hover:opacity-70"
              onClick={() => {
                BurialPoint.track('home-view all点击');
              }}
            >
              <span>{t('viewAll')}</span>
              <BsArrowRight size={12}></BsArrowRight>
            </Link>
          )}
        </div>
        <Loading loading={loading}>
          {from === ResourceFrom.BLOG ? (
            <div className="flex gap-[20px]">
              {featureBlogList.map((blog) => (
                <div key={blog.id} className="w-[calc((100%-60px)/4)]">
                  <BlogCard blog={blog} from={from} isFeatrued={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-[20px]">
              {featureBlogList.map((glossary) => (
                <div key={glossary.id} className="w-[calc((100%-60px)/4)]">
                  <GlossaryCard glossary={glossary} />
                </div>
              ))}
            </div>
          )}
        </Loading>
        <div className="button-text-l flex w-full justify-center pt-[60px]">
          <Button
            className="h-[60px] w-[270px] border border-neutral-black p-0 text-neutral-black"
            onClick={handleClick}
          >
            {business.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
