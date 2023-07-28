import { NextPage } from 'next';
import FailIcon from '@/public/images/login/robot.svg';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import webApi from '@/service';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/redux/modules/user';
import { useState } from 'react';
import { setToken } from '@/helper/user-token';
import { omit } from 'lodash-es';
import Link from 'next/link';
interface EmailConfirmedProps {
  children: React.ReactNode;
}

const EmailConfirmed: NextPage<EmailConfirmedProps> = (props) => {
  const router = useRouter();

  const [jump, setJump] = useState(false);
  const [countDown, setCountDown] = useState(3);

  // useEffect(() => {
  //   if (countDown > 0) {
  //     const timer = setInterval(() => {
  //       setCountDown(countDown - 1);
  //     }, 1000);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   } else {
  //     router.push('/courses');
  //   }
  // }, [countDown, router]);

  return (
    <div className="w-full h-full min-h-screen flex justify-end items-center">
      <div className="py-[19.78rem] px-[7.5rem] text-center flex flex-col justify-center items-center gap-8">
        <Image src={FailIcon} alt="fail"></Image>
        <h1 className="text-[#F8F8F8] text-[1.75rem] font-next-book-bold font-bold leading-[150%] -tracking-[0.01924rem]">
          Unable to Verify Email Address!
        </h1>
        <div className="text-[#676767] font-next-book w-[31.8125rem] leading-[150%] -tracking-[0.011rem]">
          <span>
            There was a problem verifying your email address. Please try{' '}
            <Link href={'/auth/login'} className="underline text-white">
              Login
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
