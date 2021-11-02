// DayJS
const dayjs = require("dayjs");
// DayJS timezone
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function formatDate(date) {
  const dateFormat = "MMMM D, YYYY";
  const timezone = "America/New_York";
  return dayjs(date).tz(timezone).format(dateFormat);
}

export default formatDate;
