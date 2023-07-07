// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import UnitList from '@/components/Course/UnitList';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import wrapper, { AppRootState } from '@/store/redux';
import { Typography, message } from 'antd';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';

interface IProps {
  courseId: string;
  courseDetail?: CourseDetailType;
}

const LearningTrackDetail: NextPage<IProps> = (props) => {
  const { courseId, courseDetail } = props;
  return (
    <div className="px-[5.5rem]">
      <div className="mt-[6.25rem] mb-[6.25rem]">
        <CourseDetailBanner courseDetail={courseDetail}></CourseDetailBanner>
      </div>
      <CourseDetailInfo courseDetail={courseDetail}></CourseDetailInfo>
      <div className="mt-[4rem]">
        <CourseDescription>{courseDetail?.aboutDesc}</CourseDescription>
      </div>
      <h2 className="text-[#F2F2F2] font-next-book text-[1.75rem] mt-[4rem]">
        Course structure
      </h2>
      <div className="mt-[2.5rem]">
        <UnitList
          units={courseDetail?.units || []}
          courseType={courseDetail?.type}
        ></UnitList>
      </div>
    </div>
  );
};

// LearningTrack.getInitialProps = (context) => {
//   const { courseId } = context.query;
//   return {
//     courseId: courseId as string
//   };
// };

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      const { courseId } = context.query;
      let courseDetail = null;
      try {
        courseDetail = await webApi.courseApi.getCourseDetail(
          courseId as string,
          true
        );
      } catch (e: any) {
        // message.error(`Course detail ${e.message}`);
        console.log(e);
      }
      return {
        props: {
          courseId,
          courseDetail: courseDetail
        }
      };
    };
  });

export default LearningTrackDetail;
