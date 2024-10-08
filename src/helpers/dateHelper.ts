export const formateDate = (date: string | Date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${months[month]} ${day}, ${year}`;
};

export const getFormattedDate = (date: string | Date) => {
  const dateObj = new Date(date);
  const now = new Date();
  const postPublishTime = dateObj.getTime();
  const nowTime = now.getTime();

  const diffInTime = nowTime - postPublishTime;
  const diffInSeconds = Math.floor(diffInTime / 1000);

  if (diffInSeconds < 60) return `Just now`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m Ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h Ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d Ago`;

  return formateDate(date);
};
