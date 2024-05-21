export const convertDateFromSecondsToString = (seconds) => {
  const date = new Date(seconds * 1000);
  const month = convertToTwoDigitDateOrMonth(date.getMonth() + 1);
  const dateOfMonth = convertToTwoDigitDateOrMonth(date.getDate());
  return `${dateOfMonth}.${month}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
};
const convertToTwoDigitDateOrMonth = (date) => {
  return date.toString().length >= 2 ? date : `0${date + 1}`;
};
