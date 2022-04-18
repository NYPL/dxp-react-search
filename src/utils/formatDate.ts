// DayJS
const dayjs = require("dayjs");
// DayJS timezone
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

function formatDate(dateTime: string, dateFormat: string) {
  const timezone = "America/New_York";
  return dayjs(dateTime).tz(timezone).format(dateFormat);
}

export default formatDate;
