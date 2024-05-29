function subscractHoursBetweenDates(startDate, endDate) {

  const millisecond = 1000;
  const minute = 60;
  const hour = 60;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const timestampStart = start.getTime();
  const timestampEnd = end.getTime();

  const totalMilliseconds = timestampEnd - timestampStart;
  const totalHours = totalMilliseconds / (millisecond * minute * hour);

  return totalHours
}

module.exports = subscractHoursBetweenDates;