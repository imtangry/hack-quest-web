'use client';
import Loading from '@/components/Common/Loading';
import CourseDetail from '@/components/Web/DetailPage/CourseDetail';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import type { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
  //   courseId: string;
  //   courseDetail: CourseDetailType;
}

const CourseDetailPage: NextPage<IProps> = (props) => {
  const { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState<CourseDetailType>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    webApi.courseApi.getCourseDetail(courseId as string, true).then((res) => {
      setCourseDetail(res);
      setIsLoading(false);
    });
  }, [courseId, setCourseDetail]);

  return (
    <div className="container mx-auto">
      <Loading loading={isLoading} className="mt-[50vh]">
        <CourseDetail courseDetail={courseDetail}></CourseDetail>
      </Loading>
    </div>
  );
};

export default CourseDetailPage;