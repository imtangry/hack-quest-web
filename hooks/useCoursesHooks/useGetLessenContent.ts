import webApi from '@/service';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { ElectiveLessonType } from '@/service/webApi/elective/type';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRedirect } from '../useRedirect';

export const useGetLessonContent = <
  T extends CourseLessonType | ElectiveLessonType
>(
  lessonId: string,
  courseType: CourseType
) => {
  const [lesson, setLesson] = useState<T>();
  const { redirectToUrl } = useRedirect();
  const dispatch = useDispatch();
  const { run, loading, refresh } = useRequest(
    async (lessonId) => {
      switch (courseType) {
        case CourseType.Mini:
          return webApi.electiveApi.getElectiveLessonContent(lessonId);
        default:
          return webApi.courseApi.getLessonContent(lessonId);
      }
    },
    {
      manual: true,
      onSuccess(res: any) {
        setLesson(res);
      },
      onError(error: any) {
        if (error.code === 401) {
          message.error(error?.msg);
          dispatch(setUnLoginType(UnLoginType.LOGIN));
          redirectToUrl('/');
          return;
        }

        if (error?.code === 403) {
          message.error(error?.msg);
          redirectToUrl('/home');
          return;
        }
        message.error('404 Not Found');
        redirectToUrl('/404');
      }
    }
  );

  useEffect(() => {
    run(lessonId);
  }, [run, lessonId]);

  return {
    lesson,
    loading,
    refresh
  };
};
