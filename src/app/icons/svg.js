import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Dumbbell = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 30 30">
<g id="surface1">
<path style="stroke:none;fill-rule:nonzero;fill:rgb(0,0,0);fill-opacity:1;" d="M 29.507812 12.800781 L 27.816406 12.800781 L 27.816406 10.519531 C 27.816406 10.253906 27.597656 10.035156 27.332031 10.035156 L 24.589844 10.035156 L 24.589844 7.746094 C 24.589844 7.480469 24.371094 7.261719 24.105469 7.261719 L 20.878906 7.261719 C 20.613281 7.261719 20.394531 7.480469 20.394531 7.746094 L 20.394531 12.800781 L 9.515625 12.800781 L 9.515625 7.746094 C 9.515625 7.480469 9.296875 7.261719 9.03125 7.261719 L 5.804688 7.261719 C 5.539062 7.261719 5.320312 7.480469 5.320312 7.746094 L 5.320312 10.027344 L 2.578125 10.027344 C 2.3125 10.027344 2.09375 10.25 2.09375 10.515625 L 2.09375 12.792969 L 0.484375 12.792969 C 0.21875 12.792969 0 13.015625 0 13.28125 L 0 16.636719 C 0 16.902344 0.21875 17.121094 0.484375 17.121094 L 2.097656 17.121094 L 2.097656 19.484375 C 2.097656 19.75 2.320312 19.972656 2.585938 19.972656 L 5.324219 19.972656 L 5.324219 22.253906 C 5.324219 22.519531 5.546875 22.738281 5.8125 22.738281 L 9.035156 22.738281 C 9.300781 22.738281 9.523438 22.519531 9.523438 22.253906 L 9.523438 17.113281 L 20.398438 17.113281 L 20.398438 22.253906 C 20.398438 22.519531 20.621094 22.738281 20.886719 22.738281 L 24.113281 22.738281 C 24.378906 22.738281 24.597656 22.519531 24.597656 22.253906 L 24.597656 19.972656 L 27.335938 19.972656 C 27.601562 19.972656 27.824219 19.75 27.824219 19.484375 L 27.824219 17.121094 L 29.515625 17.121094 C 29.78125 17.121094 30 16.902344 30 16.636719 L 30 13.28125 C 29.992188 13.015625 29.773438 12.800781 29.507812 12.800781 Z M 2.097656 16.15625 L 0.972656 16.15625 L 0.972656 13.773438 L 2.097656 13.773438 Z M 5.324219 19.007812 L 3.070312 19.007812 L 3.070312 11.007812 L 5.324219 11.007812 Z M 8.542969 21.773438 L 6.289062 21.773438 L 6.289062 8.234375 L 8.542969 8.234375 Z M 20.394531 16.15625 L 9.515625 16.15625 L 9.515625 13.773438 L 20.394531 13.773438 Z M 23.617188 21.773438 L 21.363281 21.773438 L 21.363281 8.234375 L 23.617188 8.234375 Z M 26.84375 19.007812 L 24.589844 19.007812 L 24.589844 11.007812 L 26.84375 11.007812 Z M 29.023438 16.148438 L 27.816406 16.148438 L 27.816406 13.773438 L 29.023438 13.773438 Z M 29.023438 16.148438 "/>
</g>
</svg>
`;
  const DumbbellSVG = () => <SvgXml xml={svg} />;

  return <DumbbellSVG />;
};

export const Profile = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" id="body_1" width="30" height="30">

    <defs>
        <clipPath id="1">

            <path clip-rule="evenodd" d="M0 0L24 0L24 24L0 24z"/>
        </clipPath>
    </defs>

    <g transform="matrix(1.25 0 0 1.25 0 0)">
        <g clip-path="url(#1)">
            <path d="M0 0L24 0L24 24L0 24z" stroke="none" fill="rgba(0,0,0,0)" fill-rule="nonzero"/>
            <g>
                <path d="M14.3365 12.3466L14.0765 11.9195C 13.9082 12.022 13.8158 12.2137 13.8405 12.4092C 13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.1907 12.8249L14.3365 12.3466zM9.6634 12.3466L9.80923 12.8249C 9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C 10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.92339 11.9195L9.6634 12.3466zM4.06161 19.002L3.56544 18.9402L4.06161 19.002zM19.9383 19.002L20.4345 18.9402L19.9383 19.002zM16 8.5C 16 9.94799 15.2309 11.2168 14.0765 11.9195L14.0765 11.9195L14.5965 12.7737C 16.0365 11.8971 17 10.3113 17 8.5L17 8.5L16 8.5zM12 4.5C 14.2091 4.5 16 6.29086 16 8.5L16 8.5L17 8.5C 17 5.73858 14.7614 3.5 12 3.5L12 3.5L12 4.5zM7.99996 8.5C 7.99996 6.29086 9.79082 4.5 12 4.5L12 4.5L12 3.5C 9.23854 3.5 6.99996 5.73858 6.99996 8.5L6.99996 8.5L7.99996 8.5zM9.92339 11.9195C 8.76904 11.2168 7.99996 9.948 7.99996 8.5L7.99996 8.5L6.99996 8.5C 6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.40342 12.7737L9.92339 11.9195zM9.51758 11.8683C 6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L3.56544 18.9402L4.55778 19.0637C 4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.80923 12.8249L9.51758 11.8683zM3.56544 18.9402C 3.45493 19.8282 4.19055 20.5 4.99996 20.5L4.99996 20.5L4.99996 19.5C 4.70481 19.5 4.53188 19.2719 4.55778 19.0637L4.55778 19.0637L3.56544 18.9402zM4.99996 20.5L19 20.5L19 19.5L4.99996 19.5L4.99996 20.5zM19 20.5C 19.8094 20.5 20.545 19.8282 20.4345 18.9402L20.4345 18.9402L19.4421 19.0637C 19.468 19.2719 19.2951 19.5 19 19.5L19 19.5L19 20.5zM20.4345 18.9402C 20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.4823 11.8683L14.1907 12.8249C 16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L19.4421 19.0637L20.4345 18.9402z"
                      stroke="none" fill="#000000" fill-rule="nonzero"/>
            </g>
        </g>
    </g>
</svg>`;
  const ProfileSVG = () => <SvgXml xml={svg} />;

  return <ProfileSVG />;
};

export const Retry = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0,0,256,256"
style="fill:#FFFFFF;">
<g transform="translate(-38.4,-38.4) scale(1.3,1.3)"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="translate(0.71111,10.66796) scale(3.55556,3.55556)"><path d="M34.09961,7.00195c-1.07001,-0.0562 -2.09961,0.77673 -2.09961,1.99023v3.34766c-11.33513,1.91057 -20,11.78941 -20,23.66016c0,13.234 10.767,24 24,24c13.233,0 24,-10.766 24,-24c0,-5.67 -2.01488,-11.17214 -5.67187,-15.49414c-1.43,-1.687 -3.95372,-1.8997 -5.63672,-0.4707c-1.687,1.427 -1.8977,3.95167 -0.4707,5.63867c2.437,2.879 3.7793,6.54617 3.7793,10.32617c0,8.822 -7.178,16 -16,16c-8.822,0 -16,-7.178 -16,-16c0,-7.43861 5.11088,-13.68922 12,-15.47266v2.47852c0,1.619 1.82948,2.56014 3.14648,1.61914l9.80469,-7.00781c1.11,-0.793 1.11,-2.44333 0,-3.23633l-9.80469,-7.00781c-0.32925,-0.23525 -0.6902,-0.35236 -1.04687,-0.37109z"></path></g></g></g>
</svg>`;

  const RetrySVG = () => <SvgXml xml={svg} />;
  return <RetrySVG />;
};

export const Add = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="evenodd" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path></g></g>
</svg>`;

  const AddSVG = () => <SvgXml xml={svg} />;
  return <AddSVG />;
};

export const Timer = () => {
  const svg = `<svg viewBox="-12 -12 48.00 48.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
<path d="M4.51555 7C3.55827 8.4301 3 10.1499 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3V6M12 12L8 8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
</path> 
</g></svg>`;

  const TimerSVG = () => <SvgXml xml={svg} />;
  return <TimerSVG />;
};
