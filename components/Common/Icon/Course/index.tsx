import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const CourseIcon: React.FC<IconProps> = (props) => {
  const { size = 16, color = 'currentColor' } = props;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.666992 2.49992C0.666992 2.13173 0.965469 1.83325 1.33366 1.83325H5.33366C6.21771 1.83325 7.06556 2.18444 7.69068 2.80956C8.3158 3.43468 8.66699 4.28253 8.66699 5.16659V14.4999C8.66699 14.8681 8.36852 15.1666 8.00033 15.1666C7.63214 15.1666 7.33366 14.8681 7.33366 14.4999C7.33366 14.1463 7.19318 13.8072 6.94314 13.5571C6.69309 13.3071 6.35395 13.1666 6.00033 13.1666H1.33366C0.965469 13.1666 0.666992 12.8681 0.666992 12.4999V2.49992ZM7.33366 12.1905V5.16659C7.33366 4.63615 7.12295 4.12744 6.74787 3.75237C6.3728 3.3773 5.86409 3.16659 5.33366 3.16659H2.00033V11.8333H6.00033C6.47248 11.8333 6.93172 11.9585 7.33366 12.1905Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.30932 2.80956C8.93444 2.18444 9.78229 1.83325 10.6663 1.83325H14.6663C15.0345 1.83325 15.333 2.13173 15.333 2.49992V12.4999C15.333 12.8681 15.0345 13.1666 14.6663 13.1666H9.99967C9.64605 13.1666 9.30691 13.3071 9.05687 13.5571C8.80682 13.8072 8.66634 14.1463 8.66634 14.4999C8.66634 14.8681 8.36786 15.1666 7.99967 15.1666C7.63148 15.1666 7.33301 14.8681 7.33301 14.4999V5.16659C7.33301 4.28253 7.6842 3.43468 8.30932 2.80956ZM8.66634 12.1905C9.06828 11.9585 9.52752 11.8333 9.99967 11.8333H13.9997V3.16659H10.6663C10.1359 3.16659 9.6272 3.3773 9.25213 3.75237C8.87705 4.12744 8.66634 4.63615 8.66634 5.16659V12.1905Z"
          fill={color}
        />
      </svg>
    </>
  );
};
export default CourseIcon;
