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

export const ProfileWhite = () => {
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
                      stroke="none" fill="#ffffff" fill-rule="nonzero"/>
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

export const Pause = () => {
  const svg = `<svg fill="#ffffff" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#ffffff">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> <path d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320 c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320 c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"></path> </g>
</svg>`;

  const PauseSVG = () => <SvgXml xml={svg} />;
  return <PauseSVG />;
};

export const Chevron = () => {
  const svg = `<svg height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 185.343 185.343" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style="fill:#ffffff;" d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"></path> </g> </g> </g></svg>`;

  const ChevronSVG = () => <SvgXml xml={svg} />;
  return <ChevronSVG />;
};

export const ChevronDown = () => {
  const ChevronSVG = () => <SvgXml xml={svg} />;

  const svg = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  return <ChevronSVG />;
};

export const Settings = () => {
  const svg = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z" fill="#000000"></path> </g></svg>`;

  const SettingsSVG = () => <SvgXml xml={svg} />;
  return <SettingsSVG />;
};

export const Exercise = () => {
  const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 30 32" enable-background="new 0 0 30 32" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#ffffff" d="M23.246,20.658c0.107-0.255-0.012-0.548-0.267-0.655c-0.253-0.104-0.548,0.012-0.655,0.267 c-0.725,1.719-2.395,2.829-4.253,2.829c-1.023,0-1.992-0.329-2.801-0.95c-0.219-0.17-0.533-0.126-0.701,0.092 c-0.168,0.22-0.127,0.533,0.092,0.701c0.986,0.757,2.166,1.157,3.411,1.157C20.333,24.099,22.364,22.748,23.246,20.658z"></path> <path fill="#ffffff" d="M21.751,4.394c-0.106-0.102-2.649-2.513-5.84-3.569l-0.434-0.198c-2.836-1.295-6.209-0.522-8.202,1.88 C6.97,2.874,6.828,3.339,6.874,3.815C6.92,4.291,7.148,4.719,7.517,5.021C7.57,5.064,7.593,5.136,7.574,5.202 C7.541,5.318,7.525,5.436,7.528,5.553c0.062,2.408,1.993,4.294,4.375,4.294h0c0.692-0.016,2.126-0.412,2.689-2.279 c0.135-0.45,0.251-0.756,0.343-0.962c0.207,3.003,1.843,5.742,3.332,7.65c-0.234-0.036-0.472-0.054-0.712-0.054 c-1.894,0-3.591,1.128-4.353,2.819c-1.552-1.185-3.448-1.829-5.414-1.829c-1.87,0-3.7,0.593-5.212,1.681 C2.09,16.231,1.326,15.841,0.5,15.841c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5c0.64,0,1.22,0.381,1.477,0.971 c0.062,0.145,0.189,0.25,0.342,0.287c0.152,0.035,0.313,0,0.435-0.101c1.416-1.164,3.204-1.806,5.037-1.806 c1.963,0,3.848,0.725,5.308,2.039c0.129,0.117,0.311,0.157,0.476,0.108c0.167-0.049,0.296-0.181,0.341-0.349 c0.447-1.642,1.944-2.789,3.642-2.789c0.728,0,1.427,0.21,2.023,0.59c0.653,0.7,1.127,1.12,1.192,1.177 c0.188,0.165,0.471,0.164,0.66-0.001c0.188-0.166,0.225-0.446,0.084-0.654c-0.34-0.506-0.767-0.934-1.253-1.269 c-1.579-1.721-4.212-5.134-4.355-8.873c-0.028-0.121-0.11-0.396-0.281-0.617c-0.031-0.166-0.138-0.315-0.308-0.378 c-0.089-0.033-2.201-0.797-4.301,0.485c-0.235,0.144-0.31,0.451-0.166,0.688c0.094,0.154,0.259,0.239,0.427,0.239 c0.089,0,0.179-0.023,0.26-0.073c0.963-0.588,1.938-0.63,2.604-0.562c-0.17,0.32-0.335,0.753-0.507,1.325 c-0.466,1.545-1.563,1.55-1.711,1.568c-1.856,0-3.349-1.458-3.389-3.372c0.127-0.449-0.023-0.931-0.385-1.228 c-0.162-0.132-0.262-0.32-0.282-0.528C7.849,3.51,7.912,3.306,8.045,3.145c1.706-2.057,4.59-2.72,7.017-1.608l0.484,0.218 c3.022,1.003,5.49,3.339,5.5,3.348c7.183,7.477,7.881,14.339,7.948,15.554c-3.24,3.386-7.764,5.324-12.445,5.324 c-2.16,0-4.266-0.396-6.259-1.176c-0.153-0.06-0.327,0.025-0.462,0.12c-0.137,0.093-0.217,0.314-0.217,0.479 C9.609,28.489,7.107,31,4.032,31c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5c3.434,0,6.261-2.652,6.553-6.021 c1.913,0.665,3.916,1.001,5.963,1.001c5.026,0,9.88-2.111,13.317-5.792C29.951,21.096,30,20.976,30,20.85 C30.002,20.53,29.95,12.928,21.751,4.394z"></path> </g> </g></svg>`;

  const ExerciseSVG = () => <SvgXml xml={svg} />;
  return <ExerciseSVG />;
};

export const Workout = () => {
  const svg = `<svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-8.09 -8.09 97.11 97.11" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style="fill:#010002;" d="M65.383,0c-1.09,0-1.974,0.884-1.974,1.974v7.675H17.52V1.974C17.52,0.884,16.636,0,15.546,0 s-1.973,0.884-1.973,1.974v19.297c0,1.089,0.883,1.974,1.973,1.974s1.974-0.885,1.974-1.974v-7.677h3.297 c-0.051,0.145-0.088,0.297-0.088,0.455V31.08v2.412c0,0.704,0.559,1.297,1.333,1.518h1.302H29h2.204v0.015v20.783H21.175 c-3.094,0-5.612,2.509-5.629,5.598V75.3c0,3.103,2.525,5.628,5.629,5.628s5.628-2.525,5.628-5.628v-8.234h4.4h3.947h4.955h4.955 h3.946h4.621V75.3c0,3.103,2.525,5.628,5.628,5.628s5.628-2.525,5.628-5.628V61.436c0-3.104-2.525-5.629-5.628-5.629H49.008 V35.024v-0.013h2.231h6.019h1.292c0.778-0.22,1.339-0.812,1.339-1.52v-2.412v-17.03c0-0.158-0.037-0.311-0.089-0.455h3.61v7.677 c0,1.089,0.884,1.974,1.974,1.974c1.089,0,1.973-0.885,1.973-1.974V1.973C67.356,0.884,66.474,0,65.383,0z M24.697,31.08V14.049 c0-0.158-0.037-0.311-0.089-0.455h10.536c-3.745,1.844-6.334,5.687-6.334,10.134c0,2.623,0.911,5.026,2.417,6.945 c-0.008,0.081-0.023,0.159-0.023,0.241v0.164l0,0L24.697,31.08z M40.107,16.376c4.052,0,7.349,3.297,7.349,7.352 c0,4.054-3.297,7.351-7.349,7.351c-4.053,0-7.349-3.297-7.349-7.351C32.758,19.673,36.053,16.376,40.107,16.376z M59.257,59.754 c0.892,0,1.623,0.697,1.679,1.574l0.003,13.971c0,0.928-0.754,1.682-1.682,1.682c-0.929,0-1.682-0.754-1.682-1.682V63.117h-8.567 h-3.99h-4.911h-4.94h-3.963h-8.348v12.182c0,0.928-0.754,1.682-1.681,1.682c-0.928,0-1.683-0.754-1.683-1.682V61.682l0.006-0.042 l-0.002-0.305c0.052-0.881,0.785-1.582,1.679-1.582h10.029h3.991v-3.946V35.024h9.823v20.783v3.946h3.99L59.257,59.754 L59.257,59.754z M55.92,14.049V31.08h-6.912v-0.002v-0.069c0-0.112-0.016-0.221-0.029-0.329c1.509-1.919,2.424-4.326,2.424-6.952 c0-4.447-2.59-8.29-6.335-10.134h10.941C55.957,13.738,55.92,13.89,55.92,14.049z"></path> <path style="fill:#010002;" d="M69.769,0c-1.09,0-1.974,0.884-1.974,1.974v19.297c0,1.089,0.884,1.974,1.974,1.974 s1.973-0.885,1.973-1.974V1.973C71.742,0.884,70.857,0,69.769,0z"></path> <path style="fill:#010002;" d="M74.195,0c-1.09,0-1.974,0.884-1.974,1.974v19.297c0,1.089,0.883,1.974,1.974,1.974 s1.973-0.885,1.973-1.974V1.973C76.168,0.884,75.285,0,74.195,0z"></path> <path style="fill:#010002;" d="M6.734,0c-1.09,0-1.973,0.884-1.973,1.974v19.297c0,1.089,0.883,1.974,1.973,1.974 s1.974-0.885,1.974-1.974V1.973C8.709,0.884,7.825,0,6.734,0z"></path> <path style="fill:#010002;" d="M11.119,0C10.03,0,9.146,0.884,9.146,1.974v19.297c0,1.089,0.884,1.974,1.973,1.974 c1.09,0,1.975-0.885,1.975-1.974V1.973C13.093,0.884,12.209,0,11.119,0z"></path> </g> </g> </g></svg>`;
  const WorkoutSVG = () => <SvgXml xml={svg} />;
  return <WorkoutSVG />;
};

export const Preferences = () => {
  const svg = `<svg width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>preferences</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-152.000000, -359.000000)" fill="#ffffff"> <path d="M182,387 C182,388.104 181.104,389 180,389 L156,389 C154.896,389 154,388.104 154,387 L154,363 C154,361.896 154.896,361 156,361 L180,361 C181.104,361 182,361.896 182,363 L182,387 L182,387 Z M180,359 L156,359 C153.791,359 152,360.791 152,363 L152,387 C152,389.209 153.791,391 156,391 L180,391 C182.209,391 184,389.209 184,387 L184,363 C184,360.791 182.209,359 180,359 L180,359 Z M172,378.4 C170.674,378.4 169.6,377.325 169.6,376 C169.6,374.675 170.674,373.6 172,373.6 C173.326,373.6 174.4,374.675 174.4,376 C174.4,377.325 173.326,378.4 172,378.4 L172,378.4 Z M178,375 L175.858,375 C175.413,373.277 173.862,372 172,372 C170.138,372 168.588,373.277 168.142,375 L158,375 C157.448,375 157,375.448 157,376 C157,376.553 157.448,377 158,377 L168.142,377 C168.587,378.723 170.138,380 172,380 C173.862,380 175.413,378.723 175.858,377 L178,377 C178.552,377 179,376.553 179,376 C179,375.448 178.552,375 178,375 L178,375 Z M163,370.4 C161.674,370.4 160.6,369.325 160.6,368 C160.6,366.675 161.674,365.601 163,365.601 C164.326,365.601 165.4,366.675 165.4,368 C165.4,369.325 164.326,370.4 163,370.4 L163,370.4 Z M178,367 L166.858,367 C166.413,365.277 164.862,364 163,364 C161.138,364 159.587,365.277 159.142,367 L158,367 C157.448,367 157,367.448 157,368 C157,368.553 157.448,369 158,369 L159.142,369 C159.587,370.723 161.138,372 163,372 C164.862,372 166.413,370.723 166.858,369 L178,369 C178.552,369 179,368.553 179,368 C179,367.448 178.552,367 178,367 L178,367 Z M163,386.4 C161.674,386.4 160.6,385.325 160.6,384 C160.6,382.675 161.674,381.601 163,381.601 C164.326,381.601 165.4,382.675 165.4,384 C165.4,385.325 164.326,386.4 163,386.4 L163,386.4 Z M178,383 L166.858,383 C166.413,381.278 164.862,380 163,380 C161.138,380 159.587,381.278 159.142,383 L158,383 C157.448,383 157,383.447 157,384 C157,384.553 157.448,385 158,385 L159.142,385 C159.587,386.723 161.138,388 163,388 C164.862,388 166.413,386.723 166.858,385 L178,385 C178.552,385 179,384.553 179,384 C179,383.447 178.552,383 178,383 L178,383 Z" id="preferences" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>`;
  const PreferencesSVG = () => <SvgXml xml={svg} />;
  return <PreferencesSVG />;
};

export const Delete = () => {
  const svg = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f20d0dbf"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#f20d0dbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#f20d0dbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#f20d0dbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#f20d0dbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#f20d0dbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  const DeleteSVG = () => <SvgXml xml={svg} />;
  return <DeleteSVG />;
};

export const Selected = () => {
  const svg = `<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="none" stroke="#ffffff" stroke-width="2" d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z M12,17 C14.7614237,17 17,14.7614237 17,12 C17,9.23857625 14.7614237,7 12,7 C9.23857625,7 7,9.23857625 7,12 C7,14.7614237 9.23857625,17 12,17 Z"></path> </g></svg>`;
  const SelectedSVG = () => <SvgXml xml={svg} />;
  return <SelectedSVG />;
};

export const Unselected = () => {
  const svg = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  const UnselectedSVG = () => <SvgXml xml={svg} />;
  return <UnselectedSVG />;
};

export const Apple = () => {
  const svg = `<svg width="24px" height="24px" viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>apple [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" id="apple-[#ffffff]"> </path> </g> </g> </g> </g></svg>`;
  const AppleSVG = () => <SvgXml xml={svg} />;
  return <AppleSVG />;
};

export const Scale = () => {
  const svg = `<svg fill="#ffffff" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M511.173,264.814l-53.646-158.703c-1.237-7.68-7.876-13.55-15.904-13.55H300.478 c-4.777-13.133-15.215-23.571-28.348-28.348V30.62c0-8.279-6.066-15.543-14.294-16.451c-9.729-1.073-17.963,6.515-17.963,16.028 v34.017c-13.133,4.777-23.571,15.215-28.348,28.348H70.377c-8.028,0-14.667,5.871-15.904,13.55L0.827,264.814 c-0.752,2.221-0.972,4.542-0.739,6.812v35.705c0,22.722,18.42,41.141,41.141,41.141h58.576c22.722,0,41.141-18.42,41.141-41.141 v-35.705c0.233-2.269,0.013-4.59-0.739-6.812L92.887,124.819H211.92c4.502,12.377,14.03,22.362,26.106,27.47l-49.974,313.387 h-63.884c-8.279,0-15.543,6.066-16.451,14.294c-1.073,9.729,6.515,17.963,16.028,17.963h263.014 c8.279,0,15.543-6.066,16.451-14.294c1.073-9.729-6.515-17.963-16.028-17.963h-63.579l-49.954-313.258 c12.229-5.066,21.89-15.111,26.432-27.599h119.033l-47.322,139.995c-0.752,2.221-0.972,4.542-0.739,6.812v35.705 c0,22.722,18.42,41.141,41.141,41.141h58.576c22.722,0,41.142-18.42,41.142-41.141v-35.705 C512.145,269.357,511.924,267.036,511.173,264.814z M108.691,307.331c-0.001,4.906-3.978,8.884-8.885,8.884H41.231 c-4.906,0-8.884-3.977-8.884-8.884v-21.223h76.343V307.331z M102.056,253.85H38.188l31.934-94.471L102.056,253.85z M256,93.636 c8.301,0,15.054,6.753,15.054,15.054c0,8.301-6.753,15.054-15.054,15.054c-8.301,0-15.054-6.753-15.054-15.054 C240.946,100.389,247.699,93.636,256,93.636z M291.333,465.676h-71.012l4.801-30.107h61.41L291.333,465.676z M281.388,403.312 h-51.123l25.562-160.295L281.388,403.312z M441.879,159.379l31.934,94.471h-63.867L441.879,159.379z M479.654,307.331 c0,4.906-3.977,8.884-8.884,8.884h-58.576c-4.906,0-8.884-3.977-8.884-8.884v-21.223h76.343V307.331z"></path> </g> </g> </g></svg>`;
  const ScaleSVG = () => <SvgXml xml={svg} />;
  return <ScaleSVG />;
};

export const Fire = () => {
  const svg = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 13.1111C3 20.2222 8.28889 22 10.9333 22C12.2874 22 14.2481 21.6432 16 20.6097M18.7207 18C19.5021 16.7537 20 15.152 20 13.1111C20 8.58427 17.1653 5.35127 14.6023 3.49767C13.4438 2.65985 12 3.58 12 5.00971V5.33334C12 6.7752 11.3938 9.40705 9.70932 10.5017C8.84932 11.0606 7.92052 10.2241 7.816 9.20382L7.73017 8.36598C7.6304 7.39197 6.63841 6.80069 5.85996 7.39454C5.18794 7.90718 4.50139 8.60486 3.96944 9.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 18.4445C8 21.2889 10.4889 22 11.7333 22C12.8222 22 15 21.2889 15 18.4445C15 17.3435 14.4107 16.6002 13.8404 16.1713C13.4424 15.872 12.8828 16.1408 12.7459 16.6196C12.5675 17.2437 11.9228 17.636 11.5944 17.0759C11.2941 16.5638 11.2941 15.7957 11.2941 15.3334C11.2941 14.6968 10.6539 14.2847 10.1389 14.6589C9.10649 15.4091 8 16.6815 8 18.4445Z" stroke="#ffffff" stroke-width="1.5"></path> </g></svg>`;
  const FireSVG = () => <SvgXml xml={svg} />;
  return <FireSVG />;
};

export const ArrowDownRight = () => {
  const svg = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7071 3.29286C10.0976 3.68339 10.0976 4.31655 9.7071 4.70708L6.41421 7.99997H12C16.4183 7.99997 20 11.5817 20 16V20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20V16C18 12.6863 15.3137 9.99997 12 9.99997H6.41421L9.7071 13.2929C10.0976 13.6834 10.0976 14.3166 9.7071 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071L3.29289 9.70708C2.90237 9.31655 2.90237 8.68339 3.29289 8.29286L8.29289 3.29286C8.68342 2.90234 9.31658 2.90234 9.7071 3.29286Z" fill="#ffffff"></path> </g></svg>`;
  const ArrowDownRightSVG = () => <SvgXml xml={svg} />;
  return <ArrowDownRightSVG />;
};
