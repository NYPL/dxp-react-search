// DayJS
const dayjs = require("dayjs");
// DayJS timezone
const utcPlugin = require("dayjs/plugin/utc");
const timezonePlugin = require("dayjs/plugin/timezone");
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

function formatDate(date) {
  const dateFormat = "h a";
  const timezone = "America/New_York";
  return dayjs(date).tz(timezone).format(dateFormat);
}

export default formatDate;
