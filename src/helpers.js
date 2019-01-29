
export const formattedDate = (originalDate) => {
  let currentDate = new Date();
  let mDate = originalDate.split(' ');
  let todayDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
  let newDate = mDate[1].split(':');
  newDate = ((newDate[0] < 10) ? '0' + newDate[0] : newDate[0]) + ':' + ((newDate[1] < 10) ? '0' + newDate[1] : newDate[1]);
  if (todayDate != mDate[0]) {
    let newDateDays = mDate[0].split('-');
    newDate = newDateDays[2] + '/' + newDateDays[1] + '/' + newDateDays[0] + ' ' + newDate;
  }
  return newDate;
}