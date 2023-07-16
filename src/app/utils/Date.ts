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
