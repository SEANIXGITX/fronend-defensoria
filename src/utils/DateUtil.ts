/**
 * This method become the date variable in format yyyy/mm/dd
 * @param date
 * @returns
 */
export const formatDate = (date: Date): string => {
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear();
  return `${yy}/${mm}/${dd}`;
};
