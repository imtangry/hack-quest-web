import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import { cn } from '@/helper/utils';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
interface LearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  className?: string;
  from?: 'dashboard' | 'learningTrack';
}
const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
  learningTrack,
  isLandingPage,
  className,
  from = 'learningTrack'
}) => {
  const { redirectToUrl } = useRedirect();

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    redirectToUrl(
      `${menuLink.learningTrack}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  return (
    <div
      className={cn(
        'h-[264px] w-full relative  p-[32px] cursor-pointer rounded-[24px] bg-[var(--neutral-white)] overflow-hidden flex items-center gap-[16px] hover:-translate-y-1 transition-all duration-300  hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]',
        className
      )}
      onClick={goLearningTrackDetail}
    >
      {learningTrack.progress && learningTrack.progress >= 1 ? (
        <div
          className={`absolute  ${
            from === 'learningTrack'
              ? 'right-[32px] top-[32px]'
              : 'right-[16px] top-[16px]'
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#00C365" />
            <path
              d="M8 15.9999L14.4 22.3999L25.6 11.1999"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : null}
      <div className="flex-1 h-full flex flex-col flex-shrink-0 justify-between">
        <div className="button-text-s w-fit uppercase  px-[10px] py-[4px] text-neutral-off-black border border-neutral-off-black rounded-[20px]  ">
          {learningTrack.track}
        </div>
        <div>
          <div className="text-neutral-off-black text-h4 line-clamp-1">
            {learningTrack.name}
          </div>
          <div className="body-s h-[66px] text-neutral-medium-gray  line-clamp-3 mt-[8px]">
            {learningTrack.description}
          </div>
        </div>
        <div>
          <CourseTags
            language={learningTrack.language}
            level={learningTrack?.level as string}
            unitCount={learningTrack?.courseCount}
            type={'learning-track'}
          ></CourseTags>
        </div>
      </div>
      <div
        className={` relative ${
          from === 'learningTrack'
            ? 'w-[200px] h-[200px]'
            : 'w-[100px] h-[100px]'
        }`}
      >
        <Image
          src={learningTrack.image || LearningTrackImg}
          fill
          alt="learning-track-img"
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
};

export default LearningTrackCard;