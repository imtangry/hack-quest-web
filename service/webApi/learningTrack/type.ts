import { CourseResponse, CourseType } from '../course/type';

export type SectionType = {
  name: string;
  courses: CourseResponse[];
};

/** 学习路线卡片信息 */
export interface LearningTrackType {
  id: string;
  name: string;
  type: CourseType;
  description: string;
  enrolled?: boolean;
  level: string;
  aboutDesc: any;
  courseCount: number;
  duration: number;
  progress: number;
  unitCount: number;
}

/** 学习路线详情 */
export interface LearningTrackDetailType {
  id: string;
  type: CourseType;
  name: string;
  description: string;
  level: string;
  enrolled?: boolean;
  aboutDesc: any;
  courseCount: number;
  progress: number;
  duration: number;
  peopleJoined: number;
  // courses: (CourseResponse )[];
  sections: SectionType[];
}
