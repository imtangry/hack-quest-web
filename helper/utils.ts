import { CourseType } from '@/service/webApi/course/type';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCourseLink = (courseType?: CourseType) => {
  if (!courseType) return '/404';
  switch (courseType) {
    case CourseType.SYNTAX:
      return `/syntax`;
    case CourseType.CONCEPT:
      return `/concept`;
    case CourseType.GUIDED_PROJECT:
      return `/guided-project`;
    case CourseType.LEARNING_TRACK:
      return `/learning-track`;
    case CourseType.HACKATHON:
      return `/hackathon`;
    case CourseType.TEASER:
      return `/teaser`;
  }
};

export const getLessonLink = (
  courseType: CourseType,
  courseName: string,
  lessonId: string
) => {
  if (!courseType || !courseName || !lessonId) return '/404';
  return `${getCourseLink(courseType)}/${courseName}/learn/${lessonId}`;
};

export const changeTextareaHeight = (target: HTMLTextAreaElement) => {
  // 重置textarea的高度为默认值，以便可以正确计算其内容的高度
  target.style.height = '40px';
  // 获取textarea的内容高度，并加上padding和border的高度
  let height = target.scrollHeight;
  // 将textarea的高度设置为内容高度
  target.style.height = height + 'px';
};
