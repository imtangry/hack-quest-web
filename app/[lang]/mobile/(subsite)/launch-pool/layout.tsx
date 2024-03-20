import { FC, ReactNode } from 'react';
import Layout from '@/components/Mobile/MobLayout/LaunchPage';
interface WebLayoutProps {
  children: ReactNode;
}

const WebLayout: FC<WebLayoutProps> = ({ children }) => {
  return <Layout navbarData={{ navList: [] }}>{children}</Layout>;
};

export default WebLayout;
