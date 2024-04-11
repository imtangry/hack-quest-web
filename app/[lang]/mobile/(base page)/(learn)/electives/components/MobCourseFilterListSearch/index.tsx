import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import { LangContext } from '@/components/Provider/Lang';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import { errorMessage } from '@/helper/ui';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import webApi from '@/service';
import { CourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType, ElectiveListDataType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useContext, useEffect, useState } from 'react';

interface MobCourseFilterListSearchProps {
  keyword: string;
}

const MobCourseFilterListSearch: FC<MobCourseFilterListSearchProps> = ({ keyword }) => {
  const [searchList, setSearchList] = useState<ElectiveCourseType[]>([]);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.courseApi.getCourseListBySearch<ElectiveListDataType>(filterParams);
      return res;
    },

    {
      manual: true,
      onSuccess(res) {
        setSearchList(res.data);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    getCourseList({
      ...mergeFilterParams(filters, sort, keyword),
      type: CourseType.MINI
    });
  }, []);

  return (
    <MobCourseFilterList
      sort={sort}
      onFilterParamsUpdate={(params) => {
        getCourseList({
          ...params,
          keyword,
          type: CourseType.MINI
        });
      }}
      filters={cloneDeep(filters)}
      title={t('courses.searchResultFor', { keyword })}
      courseList={searchList}
      loading={loading}
      renderItem={(course) => {
        return <MobElectiveCard key={course.id} course={course}></MobElectiveCard>;
      }}
    />
  );
};

export default MobCourseFilterListSearch;
