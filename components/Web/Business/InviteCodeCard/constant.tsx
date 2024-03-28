import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  RedditShareButton
} from 'next-share';
import React from 'react';
import { ReactElement, ReactNode } from 'react';

interface ShareWrapProps<T> {
  name: string;
  icon: ReactNode;
  component: T;
  props: Record<string, any>;
  showName?: boolean;
  iconSize?: number;
}

export const ShareWrap = <T extends React.ForwardRefExoticComponent<any>>(props: ShareWrapProps<T>) => {
  const ShareButton = props.component;
  const { iconSize = 16, name, showName = true } = props;
  return (
    <ShareButton {...(props.props as any)} windowWidth={1000} windowHeight={600}>
      <div key={props.name} className="hover:text-neutral-black/60 animate flex items-center gap-3 text-neutral-black">
        <div
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`
          }}
          className="relative"
        >
          {React.cloneElement(props.icon as ReactElement, {
            className: 'w-full h-full'
          })}
        </div>
        {showName && <span className="body-s whitespace-nowrap ">{`Share on ${name}`}</span>}
      </div>
    </ShareButton>
  );
};

export const shareList = function (template: string) {
  return [
    {
      name: 'X',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.2174 1.26904H14.4663L9.55298 6.8847L15.3332 14.5264H10.8073L7.26253 9.89174L3.20647 14.5264H0.956125L6.21146 8.51977L0.666504 1.26904H5.30724L8.51143 5.50526L12.2174 1.26904ZM11.428 13.1802H12.6742L4.6301 2.54446H3.29281L11.428 13.1802Z"
            fill="#0B0B0B"
          />
        </svg>
      ),
      props: {
        url: 'hackquest.io',
        title: template
      },
      component: TwitterShareButton
    },
    {
      name: 'Facebook',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_5230_27759)">
            <path
              d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z"
              fill="#0B0B0B"
            />
          </g>
          <defs>
            <clipPath id="clip0_5230_27759">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      props: {
        url: 'hackquest.io',
        quote: template
      },
      component: FacebookShareButton
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_5230_27747)">
            <path
              d="M14.8156 0H1.18125C0.528125 0 0 0.515625 0 1.15313V14.8438C0 15.4813 0.528125 16 1.18125 16H14.8156C15.4688 16 16 15.4813 16 14.8469V1.15313C16 0.515625 15.4688 0 14.8156 0ZM4.74687 13.6344H2.37188V5.99687H4.74687V13.6344ZM3.55938 4.95625C2.79688 4.95625 2.18125 4.34062 2.18125 3.58125C2.18125 2.82188 2.79688 2.20625 3.55938 2.20625C4.31875 2.20625 4.93437 2.82188 4.93437 3.58125C4.93437 4.3375 4.31875 4.95625 3.55938 4.95625ZM13.6344 13.6344H11.2625V9.92188C11.2625 9.0375 11.2469 7.89687 10.0281 7.89687C8.79375 7.89687 8.60625 8.8625 8.60625 9.85938V13.6344H6.2375V5.99687H8.5125V7.04063H8.54375C8.85938 6.44063 9.63438 5.80625 10.7875 5.80625C13.1906 5.80625 13.6344 7.3875 13.6344 9.44375V13.6344Z"
              fill="#0B0B0B"
            />
          </g>
          <defs>
            <clipPath id="clip0_5230_27747">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      props: {
        url: 'hackquest.io',
        title: template,
        summary: '',
        source: ''
      },
      component: LinkedinShareButton
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 16L1.12466 11.8913C0.430666 10.6886 0.0659999 9.32531 0.0666665 7.92732C0.0686665 3.55666 3.62533 0 7.99532 0C10.116 0.000666665 12.1066 0.826665 13.604 2.32533C15.1006 3.82399 15.9246 5.81599 15.924 7.93465C15.922 12.306 12.3653 15.8626 7.99532 15.8626C6.66865 15.862 5.36132 15.5293 4.20332 14.8973L0 16ZM4.39799 13.462C5.51532 14.1253 6.58198 14.5226 7.99265 14.5233C11.6246 14.5233 14.5833 11.5673 14.5853 7.93332C14.5866 4.29199 11.642 1.34 7.99798 1.33866C4.36332 1.33866 1.40666 4.29466 1.40533 7.92798C1.40466 9.41131 1.83933 10.522 2.56933 11.684L1.90333 14.116L4.39799 13.462ZM11.9893 9.81931C11.94 9.73665 11.808 9.68731 11.6093 9.58798C11.4113 9.48865 10.4373 9.00931 10.2553 8.94331C10.074 8.87731 9.94198 8.84398 9.80931 9.04265C9.67731 9.24065 9.29731 9.68731 9.18198 9.81931C9.06665 9.95131 8.95065 9.96798 8.75265 9.86865C8.55465 9.76931 7.91598 9.56065 7.15932 8.88531C6.57065 8.35998 6.17265 7.71132 6.05732 7.51265C5.94199 7.31465 6.04532 7.20732 6.14399 7.10865C6.23332 7.01998 6.34199 6.87732 6.44132 6.76132C6.54199 6.64665 6.57465 6.56399 6.64132 6.43132C6.70732 6.29932 6.67465 6.18332 6.62465 6.08399C6.57465 5.98532 6.17865 5.00999 6.01399 4.61332C5.85265 4.22732 5.68932 4.27932 5.56799 4.27332L5.18799 4.26666C5.05599 4.26666 4.84132 4.31599 4.65999 4.51466C4.47866 4.71332 3.96666 5.19199 3.96666 6.16732C3.96666 7.14265 4.67666 8.08465 4.77532 8.21665C4.87466 8.34865 6.17199 10.35 8.15932 11.208C8.63198 11.412 9.00131 11.534 9.28865 11.6253C9.76331 11.776 10.1953 11.7546 10.5366 11.704C10.9173 11.6473 11.7086 11.2246 11.874 10.762C12.0393 10.2986 12.0393 9.90198 11.9893 9.81931Z"
            fill="#0B0B0B"
          />
        </svg>
      ),
      props: {
        url: 'hackquest.io',
        title: template,
        separator: ''
      },
      component: WhatsappShareButton
    },
    {
      name: 'Messenger',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 7.76C0 3.302 3.494 0 8 0C12.506 0 16 3.304 16 7.762C16 12.22 12.506 15.522 8 15.522C7.19 15.522 6.414 15.414 5.684 15.214C5.542 15.176 5.39 15.186 5.256 15.246L3.668 15.946C3.57209 15.9883 3.46726 16.0064 3.36272 15.9987C3.25818 15.991 3.15712 15.9578 3.06844 15.9019C2.97976 15.846 2.90617 15.7692 2.85413 15.6782C2.80209 15.5872 2.7732 15.4848 2.77 15.38L2.726 13.956C2.722 13.78 2.642 13.616 2.512 13.5C0.956 12.108 0 10.092 0 7.76ZM5.54601 6.302L3.19601 10.03C2.97001 10.388 3.41001 10.79 3.74601 10.534L6.27001 8.618C6.35306 8.55492 6.45439 8.52061 6.55867 8.52025C6.66296 8.51989 6.76453 8.5535 6.84801 8.616L8.71801 10.018C8.85065 10.1176 9.00249 10.1886 9.16397 10.2266C9.32544 10.2646 9.49303 10.2687 9.65616 10.2386C9.81929 10.2085 9.97441 10.145 10.1117 10.0519C10.2491 9.95886 10.3656 9.83836 10.454 9.698L12.806 5.972C13.03 5.614 12.59 5.21 12.254 5.466L9.73001 7.382C9.64696 7.44508 9.54563 7.47939 9.44134 7.47975C9.33706 7.48011 9.23549 7.4465 9.15201 7.384L7.28201 5.982C7.14937 5.88239 6.99752 5.81136 6.83605 5.77339C6.67457 5.73542 6.50698 5.73135 6.34385 5.76142C6.18073 5.79149 6.0256 5.85505 5.88828 5.94809C5.75095 6.04114 5.63441 6.16164 5.54601 6.302Z"
            fill="#0B0B0B"
          />
        </svg>
      ),
      props: {
        url: 'hackquest.io',
        redirectUri: 'hackquest.io',
        appId: ''
      },
      component: FacebookMessengerShareButton
    },
    {
      name: 'Reddit',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.1637 6.83039C12.8094 6.83039 13.3333 7.35437 13.3333 7.99998C13.3333 8.47718 13.0433 8.88887 12.6597 9.07601C12.6784 9.18829 12.6877 9.30057 12.6877 9.42221C12.6877 11.2187 10.6012 12.669 8.01872 12.669C5.43626 12.669 3.34971 11.2187 3.34971 9.42221C3.34971 9.30057 3.35907 9.17893 3.37778 9.06665C2.96609 8.87952 2.68538 8.47718 2.68538 7.99998C2.68538 7.35437 3.20936 6.83039 3.85497 6.83039C4.16375 6.83039 4.4538 6.96139 4.65965 7.15788C5.46433 6.5684 6.57778 6.20349 7.82223 6.16607L8.4117 3.37776C8.43041 3.32162 8.45848 3.27484 8.50527 3.24677C8.55205 3.2187 8.60819 3.20934 8.66433 3.2187L10.6012 3.63039C10.7322 3.34969 11.0129 3.16256 11.3404 3.16256C11.7988 3.16256 12.1731 3.53683 12.1731 3.99531C12.1731 4.45379 11.7988 4.82805 11.3404 4.82805C10.8912 4.82805 10.5263 4.4725 10.5076 4.03273L8.77661 3.66782L8.24328 6.16607C9.45965 6.21285 10.5637 6.58712 11.3591 7.15788C11.5649 6.95203 11.8456 6.83039 12.1637 6.83039ZM6.16609 7.99998C5.70761 7.99998 5.33334 8.37425 5.33334 8.83273C5.33334 9.29121 5.70761 9.66548 6.16609 9.66548C6.62457 9.66548 6.99883 9.29121 6.99883 8.83273C6.99883 8.37425 6.62457 7.99998 6.16609 7.99998ZM8.00936 11.6398C8.32749 11.6398 9.41287 11.6023 9.98363 11.0316C10.0678 10.9474 10.0678 10.8164 10.0023 10.7228C9.91813 10.6386 9.77778 10.6386 9.69357 10.7228C9.32866 11.0783 8.57076 11.2093 8.01872 11.2093C7.46667 11.2093 6.69942 11.0783 6.34386 10.7228C6.25965 10.6386 6.1193 10.6386 6.03509 10.7228C5.95088 10.807 5.95088 10.9474 6.03509 11.0316C6.59649 11.593 7.69123 11.6398 8.00936 11.6398ZM9.00117 8.83273C9.00117 9.29121 9.37544 9.66548 9.83392 9.66548C10.2924 9.66548 10.6667 9.29121 10.6667 8.83273C10.6667 8.37425 10.2924 7.99998 9.83392 7.99998C9.37544 7.99998 9.00117 8.37425 9.00117 8.83273Z"
            fill="#0B0B0B"
          />
        </svg>
      ),
      props: {
        url: 'hackquest.io',
        title: template
      },
      component: RedditShareButton
    }
  ];
};
