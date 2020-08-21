function filterByOpenNow(locations) {
  const today = new Date();
  // Get the current time, in format 13:56
  // Force timezone to new york.
  const nowTime = today.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    hour: '2-digit',
    minute:'2-digit'
  });
  // Get the current day in format: Thu
  // Force timezone to new york.
  const weekday = today.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short'
  });

  return locations.reduce((accumlator, location) => {
    location.hours.regular.map(hoursItem => {
      // Find today in weekly hours.
      if (hoursItem.day.replace('.','') === weekday) {
        // Multiple checks to determine if the location is open now.
        if (
          // Check for not null.
          hoursItem.open !== null && hoursItem.close !== null
          // @TODO Check alerts: location._embedded.alerts for closings.
          // Check for extended closing.
          && location.open
          // Check open/closed hours against now time.
          && hoursItem.open <= nowTime && hoursItem.close >= nowTime
        ) {
          // @TODO Remove debug code.
          /*
          console.log(location.name);
          console.log('location open hours: ' + hoursItem.open);
          console.log('location close hours: ' + hoursItem.close);
          console.log('now time: ' + nowTime);
          console.log(typeof nowTime);
          console.log(typeof hoursItem.close);
          */
          accumlator.push(location);
        }
      }
    });
    return accumlator;
  }, []);
}

export default filterByOpenNow;
