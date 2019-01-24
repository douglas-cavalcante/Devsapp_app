
export const formattedDate = (originalDate) => {

  let cDate = new Date();
  let mDate = originalDate.split(' ');
  let todayDate = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate();

  let newDate = mDate[1].split(':');
  newDate = ((newDate[0] < 10) ? '0' + newDate[0] : newDate[0]) + ':' + ((newDate[1] < 10) ? '0' + newDate[1] : newDate[1]);

  if (todayDate != mDate[0]) {
    let newDateDays = mDate[0].split('-');
    newDate = newDateDays[2] + '/' + newDateDays[1] + '/' + newDateDays[0] + ' ' + newDate;
  }
  return newDate;
}