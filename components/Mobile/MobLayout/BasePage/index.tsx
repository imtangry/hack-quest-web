'use client';
import { FC, ReactNode } from 'react';

import { NavbarProps } from './Navbar';
import { navbarList, dashBoard } from './Navbar/constant';
import BaseLayout from './BaseLayout';

import { deepClone } from '@/helper/utils';
import { useUserStore } from '@/store/zustand/userStore';
export interface LayoutProps {
  navbarData: NavbarProps;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = (props) => {
  let { children, navbarData } = props;
  const userInfo = useUserStore((state) => state.userInfo);
  let navList;
  if (userInfo) {
    navList = deepClone(navbarList);
    navList.unshift(dashBoard);
  } else {
    navList = deepClone(navbarList);
  }
  navbarData.navList = navList;
  return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
};
export default V2Layout;
