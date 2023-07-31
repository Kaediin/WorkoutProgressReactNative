import {WeightValueFragment} from '../graphql/operations';

export const enumToReadableString = (str: string): string => {
  return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).replace(
    '_',
    ' ',
  );
};

export const isValidEmail = (email: string): boolean => {
  return Boolean(email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g));
};

export const isValidPassword = (password: string): boolean => {
  return Boolean(
    password.match(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    ),
  );
};

export const weightValueToString = (
  weightValue: WeightValueFragment,
): string => {
  return `${weightValue.baseWeight}${
    weightValue.fraction ? '.' + weightValue.fraction : ''
  } ${weightValue.unit}`;
};

export const errorCodeToMessage = (code: string): string => {
  if (code === 'NotAuthorizedException') {
    return 'Invalid email and password combination';
  }
  return '';
};
