import React from 'react';
import { SearchInfoType } from '../type';
import { filterList } from '../data';

interface FilterProp {
  changeSearchInfo: (val: SearchInfoType) => void;
  searchInfo: SearchInfoType;
}

const Filter: React.FC<FilterProp> = ({ changeSearchInfo, searchInfo }) => {
  return (
    <div className="flex gap-[20px]">
      {filterList.map((v) => (
        <div
          key={v.value}
          onClick={() => changeSearchInfo({ ...searchInfo, filter: v.value })}
          className={`body-l px-[24px] py-[8px] text-[var(--neutral-off-black)]  border rounded-[12px] cursor-pointer ${
            searchInfo.filter === v.value
              ? ' border-[var(--yellow-primary)] font-bold bg-[var(--yellow-primary)]'
              : ' border-[var(--neutral-rich-gray)]'
          }`}
        >
          {v.label}
        </div>
      ))}
    </div>
  );
};

export default Filter;
