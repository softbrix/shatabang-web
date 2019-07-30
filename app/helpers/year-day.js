import { helper } from '@ember/component/helper';

const DAY_MINUTES = 24 * 60;
const MILLIS = 1000;
const MINUTE_SECONDS = 60;
const ONE_DAY = DAY_MINUTES * MINUTE_SECONDS * MILLIS;

let isLeapYear = function(date) {
  let year = date.getFullYear();
  if(year % 4 === 0) {
    if(year % 100 === 0) {
      return year % 400 !== 0;
    }
    return true;
  }
  return false;
};

function dateToDay(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  var day = Math.floor(diff / ONE_DAY);

  if (!isLeapYear(date) && date.getMonth() > 2) {
    // Skip 29:th feb if no leap year
    day += 1;
  }
  return day;
}

export function monthDay([date]/*, hash*/) {
  return '('+dateToDay(date)+')';
}

export default helper(monthDay);
