function filterByOpenNow(location) {
  // Check for extended closing
  /*if (location.open) {
    return true;
  }
  */

  const today = new Date();
  const weekDayKeys = new Array('Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.');
  //const nowTime = today.getHours() + ':' + today.getMinutes();
  //console.log(nowTime);

  return true;
   
  // Check if location is currerntly open based on todays hours.
  location.hours.regular.map(item => {
    return true;
    console.log('map!');
    // Find today in weekly hours
    if (weekDayKeys[today.getDay()] === item.day) {
      if (item.open === null) {
        console.log('null: ' + location.name);
        return false;
      }

      if (location.open) {
        return true;
      }
    }
      /*
      const startOpen = new Date();
      const startRawHours = item.open.split(':');
      startOpen.setHours(startRawHours[0],startRawHours[1],0);

      const endOpen =  new Date();
      const endRawHours = item.close.split(':');
      endOpen.setHours(endRawHours[0],endRawHours[1],0);
      */

      /*console.log('today: ' + today);
      console.log('startOpen: ' + startOpen);
      console.log('endOpen: ' + endOpen);
      */
      // Check if location is open based on hours
    /*
    if (startOpen <= today && endOpen < today) {
        return true;
      } else {
        return false;
      }
    }
    */
  });

  // Check alerts: location._embedded.alerts for closings. 71 locations?
}

export default filterByOpenNow;
