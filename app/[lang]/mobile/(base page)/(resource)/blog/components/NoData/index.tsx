import Link from 'next/link';
import React from 'react';

interface NoDataProp {
  href: string;
}

const NoData: React.FC<NoDataProp> = ({ href }) => {
  return (
    <div className="flex flex-col items-center gap-[1.25rem]">
      <p className="body-m text-neutral-medium-gray">There is no content yet~</p>
      <Link
        className="button-text-m flex h-[3rem] w-[13rem] items-center justify-center rounded-[2.5rem] border border-neutral-black text-neutral-black"
        href={href}
      >
        BACK TO ALL BLOGS
      </Link>
    </div>
  );
};

export default NoData;
