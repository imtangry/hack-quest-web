import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { CourseDetailType, ProjectCourseType, CourseType } from '@/service/webApi/course/type';
import { SectionType } from '@/service/webApi/learningTrack/type';
import { ThemeContext } from '@/store/context/theme';
import { Progress } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { GrSubtract } from 'react-icons/gr';
import { VscAdd } from 'react-icons/vsc';
import styled from 'styled-components';
import { TrackListContext } from '../../LearningTrackDetail';
import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: var(--learning-track-progress-text-color);
      font-size: 0.625rem;
      .anticon-check {
        font-size: 1rem;
      }
    }
  }
`;

interface SectionCardProps {
  section: SectionType;
  enrolled?: boolean;
  index: number;
  expandAll: boolean;
  sectionList: SectionType[];
  learningSectionIndex?: number;
}

const renderColorTag = (type: CourseType) => {
  switch (type) {
    case CourseType.SYNTAX:
    case CourseType.GUIDED_PROJECT:
    default:
      return <div className="left-0 h-[26px] w-[0.25rem] rounded-xl bg-neutral-medium-gray"></div>;
  }
};

function SectionList(props: {
  section: SectionType;
  enrolled: boolean;
  theme: Theme;
  sectionIndex: number;
  sectionList: SectionType[];
}) {
  const { section, enrolled, theme, sectionIndex, sectionList } = props;
  const { redirectToUrl } = useRedirect();
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const [clickIndex, setClickIndex] = useState<null | number>(null);
  const renderLearningButton = (item: CourseDetailType, index: number) => {
    if (!enrolled) return null;

    if (!!item.progress && item.progress <= 0) {
      // 课程为当前section的第一个，判断上个section的最后一个的进度，如果没有完成，那么不显示按钮
      if (index === 0 && sectionIndex !== 0) {
        let prevCourses = sectionList[sectionIndex - 1].courses;
        let prevCourse = prevCourses[prevCourses.length - 1] as ProjectCourseType;
        if (!!prevCourse.progress && prevCourse.progress < 1) return null;
      }

      //  课程不为当前section的第一个，判断上一个course的progress是否完成，完成展示start，未完成不展示
      if (index !== 0) {
        let prevCourse = sectionList[sectionIndex].courses[index - 1] as ProjectCourseType;
        if (!!prevCourse.progress && prevCourse.progress < 1) return null;
      }
    }

    return (
      <>
        {enrolled && !!item.progress && item.progress < 1 && (
          <div className="flex h-full items-center justify-end pr-[50px]">
            <Button
              loading={loading && clickIndex === index}
              disabled={loading && clickIndex === index}
              className="
              body-m w-[165px] cursor-pointer whitespace-nowrap rounded-[32px] border border-solid border-course-learning-button-border-color
              bg-course-learning-button-bg py-[11px] leading-[125%] text-neutral-black
              transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
              onClick={(e) => {
                e.stopPropagation();
                BurialPoint.track('learningTrackDetail-course学习按钮', {
                  sectionName: section.name,
                  courseName: item.title
                });
                setClickIndex(index);
                jumpLearningLesson(item, {
                  menu: Menu.LEARNING_TRACK,
                  idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
                  ids: [query.get(QueryIdType.LEARNING_TRACK_ID) as string, item.id]
                });
              }}
            >
              {item.progress > 0 ? 'Resume' : 'Start'}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <ul className="flex w-full flex-col gap-y-5 py-[15px] pl-[90px]">
      {section.courses.map((item: any, index: number) => {
        return (
          <li key={index} className={cn(`flex h-[4.25rem] items-center justify-between py-[8px]`)}>
            <div className="h-[40px] w-[40px] text-learning-track-progress-text-color">
              {!enrolled && (
                <div className="body-xl relative h-full w-full rounded-full border border-neutral-black">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{index + 1}</span>
                </div>
              )}
              {enrolled && (
                <CustomProgress
                  type="circle"
                  percent={Math.floor(computeProgress(item.progress))}
                  strokeWidth={4}
                  strokeColor={(theme === Theme.Dark && '#9EFA13') || (theme === Theme.Light && '#FCC409') || '#9EFA13'}
                  trailColor={(theme === Theme.Dark && '#EDEDED') || (theme === Theme.Light && '#8C8C8C ') || '#EDEDED'}
                  size={40}
                ></CustomProgress>
              )}
            </div>

            <div className="ml-[10%] flex items-center gap-[10px] ">
              {renderColorTag(item.type)}
              <span className="body-m inline-flex min-w-[120px] text-neutral-black  opacity-60">
                {tagFormate(item.type)}
              </span>
            </div>
            <div
              className="body-m-bold ml-[10%] w-[36%] flex-1 cursor-pointer text-learning-track-course-title-color transition hover:opacity-70"
              onClick={(e) => {
                redirectToUrl(
                  `${MenuLink.ELECTIVES}/${item.id}?${QueryIdType.LEARNING_TRACK_ID}=${query.get(QueryIdType.LEARNING_TRACK_ID)}&${
                    QueryIdType.MENU_COURSE_ID
                  }=${item.id}&menu=${Menu.LEARNING_TRACK}`
                );
                BurialPoint.track('learningTrackDetail-课程名点击', {
                  courseName: item.name
                });
              }}
            >
              {item.name}
            </div>
            {renderLearningButton(item, index)}
          </li>
        );
      })}
    </ul>
  );
}

const SectionCard: FC<SectionCardProps> = (props) => {
  const { section, enrolled = false, index: sectionIndex, expandAll, sectionList, learningSectionIndex } = props;
  const [expand, setExpand] = useState(enrolled && learningSectionIndex === sectionIndex);
  const { theme } = useContext(ThemeContext);
  const { expandList, setExpandList } = useContext(TrackListContext);

  useEffect(() => {
    setExpand(expandList.includes(sectionIndex));
  }, [expandList]);

  useEffect(() => {
    const value = enrolled && learningSectionIndex === sectionIndex;
    setExpand(value);
    if (value) {
      setExpandList((prevState) => {
        if (prevState.includes(sectionIndex)) return prevState;
        return prevState.concat(sectionIndex);
      });
    } else {
      setExpandList((prevState) => {
        return prevState.filter((item) => item !== sectionIndex);
      });
    }
  }, [enrolled]);

  const SectionTitle = (
    <div
      className="flex w-full cursor-pointer items-center gap-[35px]"
      onClick={() => {
        const value = !expand;
        setExpand(value);
        if (value) {
          !expandList.includes(sectionIndex) && setExpandList(expandList.concat(sectionIndex));
        } else {
          setExpandList(expandList.filter((item) => item !== sectionIndex));
        }
      }}
    >
      <div className="h-[55px] w-[55px]">
        {!enrolled && (
          <div className="body-xl relative h-full w-full rounded-full border border-neutral-black">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{sectionIndex + 1}</span>
          </div>
        )}
        {enrolled && (
          <CustomProgress
            type="circle"
            percent={Math.floor(computeProgress(section.progress || 0))}
            strokeWidth={4}
            strokeColor={(theme === Theme.Dark && '#9EFA13') || (theme === Theme.Light && '#FCC409') || '#9EFA13'}
            trailColor={(theme === Theme.Dark && '#EDEDED') || (theme === Theme.Light && '#8C8C8C ') || '#EDEDED'}
            size={55}
          ></CustomProgress>
        )}
      </div>
      <div className="b mt-2 flex  w-[30%] flex-1 text-text-default-color">{`${section.name}`}</div>

      {!expand && (
        <div className="h-fit w-fit p-[10px]">
          <VscAdd size={28}></VscAdd>
        </div>
      )}
      {expand && (
        <div
          className="h-fit w-fit p-[10px]"
          // onClick={() => setExpand(false)}
        >
          <GrSubtract size={28}></GrSubtract>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-col items-start py-5 ">
      {SectionTitle}
      {expand && (
        <SectionList
          section={section}
          enrolled={enrolled}
          theme={theme}
          sectionIndex={sectionIndex}
          sectionList={sectionList}
        />
      )}
    </div>
  );
};

export default SectionCard;
