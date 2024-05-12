import React from 'react';
import Overview from './Overview';
import ClassTime from './ClassTime';
import Enrollment from './Enrollment';
import Syllabus from './Syllabus';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import CourseDesc from './CourseDesc';
import { Lang } from '@/i18n/config';

interface ContentProp {
  lang: Lang;
}

const Content: React.FC<ContentProp> = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[3.75rem] text-neutral-off-black">
      <Overview lang={lang} />
      <ClassTime lang={lang} />
      <Enrollment lang={lang} />
      <Syllabus />
      <Speakers />
      <Sponsors />
      <CourseDesc lang={lang} />
    </div>
  );
};

export default Content;