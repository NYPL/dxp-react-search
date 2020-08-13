function filterByOpenNow(locations) {
  const today = new Date();
  const weekDayKeys = new Array('Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.');
  const todayMinutes = today.getMinutes() < 10 ? '00' : '' + today.getMinutes();
  const nowTime = today.getHours() + ':' + todayMinutes;

  // Test other current hours.
  //const nowTime = '19:00';

  return locations.reduce((accumlator, location) => {
    location.hours.regular.map(item => {
      // Find today in weekly hours.
      if (weekDayKeys[today.getDay()] === item.day) {
        // Multiple checks to determine if the location is open now.
        if (
          // Check for not null.
          item.open !== null && item.close !== null
          // @TODO Check alerts: location._embedded.alerts for closings.
          // Check for extended closing.
          && location.open
          // Check open/closed hours against now time.
          && item.open <= nowTime && item.close >= nowTime
        ) {
          // @TODO Remove debug code.
          /*
          console.log(location.name);
          console.log('location open hours: ' + item.open);
          console.log('location close hours: ' + item.close);
          console.log('now time: ' + nowTime);
          console.log(typeof nowTime);
          console.log(typeof item.close);
          */
          accumlator.push(location);
        }
      }
    });
    return accumlator;
  }, []);
}

export default filterByOpenNow;
