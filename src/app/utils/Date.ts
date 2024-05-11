import moment from 'moment/moment';

export const DATE_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = 'DD MMM yyyy - HH:mm';

export const getRelativeTimeIfToday = (dateString: string): string => {
  const date = moment.utc(dateString);
  if (date.isSame(moment(), 'day')) {
    // Parse the localized datetime
    const dateTime: Date = date.local(true).toDate();
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = now - dateTime;

    // Convert milliseconds to minutes
    const diffInMinutes = Math.floor(diffInMs / 60000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else {
      // Convert minutes to hours and remaining minutes
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;

      return `${hours} hours, ${minutes} minutes ago`;
    }
  } else {
    return date.format(DATE_TIME_FORMAT);
  }
};

export const getFormattedHoursMinutesString = (
  startString: string,
  endString: string,
): string => {
  const start = moment.utc(startString);
  const end = moment.utc(endString);
  return formattedHoursMinutesString(end.diff(start, 'minutes'));
};

const formattedHoursMinutesString = (minutes: number): string => {
  const fullHours = Math.floor(minutes / 60);
  if (fullHours === 0) {
    return `${minutes} minutes`;
  }
  const mins = minutes % 60;
  return `${fullHours}hrs ${mins} minutes`;
};

export const getDifferenceInMinutes = (
  startDate: string,
  endDate: string,
): number => {
  const start = moment.utc(startDate);
  const end = moment.utc(endDate);
  return end.diff(start, 'minutes');
};

export const nearestPastDate = (dateArr: Date[], date: Date) => {
  const pastArr = dateArr.filter(n => n <= date);
  return pastArr.length > 0 ? dateArr.indexOf(pastArr[0]) : null;
};

export const nearestFutureDate = (dateArr: Date[], date: Date) => {
  const futArr = dateArr.filter(n => n >= date);
  return futArr.length > 0 ? dateArr.indexOf(futArr[futArr.length - 1]) : null;
};
