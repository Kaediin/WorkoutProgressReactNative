export const enumToReadableString = (str: string): string => {
  return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).replace(
    '_',
    ' ',
  );
};

export const isValidEmail = (email: string): boolean => {
  return Boolean(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));
};
