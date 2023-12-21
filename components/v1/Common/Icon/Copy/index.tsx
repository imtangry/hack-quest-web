import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const CopyIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#E3E3E3' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.92157 20.0076C1.39314 20.0076 0.940609 19.8185 0.563982 19.4403C0.187354 19.0622 -0.000638891 18.6081 1.63121e-06 18.0782V5.5373C1.63121e-06 5.26397 0.092237 5.03469 0.276708 4.84947C0.461178 4.66426 0.689204 4.57197 0.960786 4.57261C1.23301 4.57261 1.46135 4.66522 1.64582 4.85044C1.83029 5.03566 1.92221 5.26461 1.92157 5.5373V18.0782H11.5294C11.8016 18.0782 12.03 18.1708 12.2144 18.356C12.3989 18.5413 12.4908 18.7702 12.4902 19.0429C12.4902 19.3162 12.398 19.5455 12.2135 19.7307C12.029 19.9159 11.801 20.0082 11.5294 20.0076H1.92157ZM5.76471 16.1488C5.23627 16.1488 4.78375 15.9598 4.40712 15.5816C4.03049 15.2034 3.8425 14.7494 3.84314 14.2195V2.64324C3.84314 2.11266 4.03145 1.6583 4.40808 1.28014C4.78471 0.901982 5.23692 0.713226 5.76471 0.713869H14.4118C14.9402 0.713869 15.3927 0.902947 15.7694 1.2811C16.146 1.65926 16.334 2.11331 16.3333 2.64324V14.2195C16.3333 14.75 16.145 15.2044 15.7684 15.5826C15.3918 15.9607 14.9396 16.1495 14.4118 16.1488H5.76471ZM5.76471 14.2195H14.4118V2.64324H5.76471V14.2195Z"
        fill={'#8C8C8C'}
      />
    </svg>
  );
};
export default CopyIcon;
