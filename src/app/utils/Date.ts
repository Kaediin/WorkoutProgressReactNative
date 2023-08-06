import moment from 'moment/moment';

export const DATE_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = 'DD MMM yyyy - HH:mm';

export const getRelativeTimeIfToday = (dateString: string): string => {
  const date = moment.utc(dateString);
  if (date.isSame(moment(), 'day')) {
    return date.local(true).fromNow();
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
