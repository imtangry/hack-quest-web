import React, { useMemo } from 'react';
import { SearchParamsType } from '../../constant/type';
import FilterSelect from '@/components/Web/Business/CourseFilterList/FilterSelect';
import {
  ugcCourseDefaultFilters,
  mergeFilterParams,
  courseDefaultSort
} from '@/components/Web/Business/CourseFilterList/constant';
import { cloneDeep } from 'lodash-es';
import UgcCourseCard from '@/components/Web/Business/UgcCourseCard';
import Pagination from '@/components/Common/Pagination';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface CourseListProp {
  page: number;
  searchParams: SearchParamsType;
  // courseList: CourseBaseType[];
  courseList: any[];
  handleSearch: (searchInfo: SearchParamsType) => void;
}

const CourseList: React.FC<CourseListProp> = ({
  page,
  searchParams,
  courseList,
  handleSearch
}) => {
  const { filters, sort } = useMemo(() => {
    let filters = cloneDeep(ugcCourseDefaultFilters);
    let sort = cloneDeep(courseDefaultSort);
    for (const key in searchParams) {
      const value = searchParams[key as keyof typeof searchParams] || '';
      filters.forEach((filter) => {
        filter.options.forEach((option) => {
          if (key === filter.filterField) {
            value.includes(option.value) && (option.isSelect = true);
          }
        });
      });
    }
    sort.forEach((sort) => {
      sort.isSelect = false;
      searchParams.sort === sort.value && (sort.isSelect = true);
    });
    return {
      filters,
      sort
    };
  }, [searchParams]);
  return (
    <div className="flex flex-col gap-y-8 pb-[40px]">
      {searchParams.keyword && (
        <h3 className="text-h3 text-neutral-black">{`Search result for “${searchParams.keyword}”`}</h3>
      )}
      <FilterSelect
        filters={cloneDeep(filters)}
        updateFilters={(newFilters) => {
          handleSearch(mergeFilterParams(newFilters, sort));
        }}
        sort={sort}
        updateSort={(newSort) => {
          handleSearch(mergeFilterParams(filters, newSort));
        }}
      ></FilterSelect>
      <div className="flex w-full flex-wrap gap-x-[20px] gap-y-[32px]">
        {courseList.map((v) => (
          <div className="w-[calc((100%-60px)/4)]" key={v.id}>
            <UgcCourseCard />
          </div>
        ))}
      </div>
      <div className="mt-[40px] flex justify-center">
        <Pagination
          page={page}
          total={5}
          urlPrefix={`${MenuLink.COURSE_MARKET}/p/`}
        />
      </div>
    </div>
  );
};

export default CourseList;
