'use client';
import React from 'react';
import BlogHeader from '../BlogHeader';
import BlogContent from '../BlogContent';
import BlogFooter from '../BlogFooter';
import { BlogDetailType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import BlogLink from '../BlogLink';

interface BlogDetailProp {
  blog: BlogDetailType;
  from?: ResourceFrom;
}

const BlogDetail: React.FC<BlogDetailProp> = ({ blog, from = ResourceFrom.BLOG }) => {
  return (
    <div className="body-m h-full overflow-auto">
      <BlogHeader blog={blog} from={from} />
      <BlogContent blog={blog} />
      <BlogLink />
      <BlogFooter category={from === ResourceFrom.BLOG ? blog.categories : blog.tracks} from={from} />
      <PageRetentionTime trackName="blog-content-page-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default BlogDetail;
