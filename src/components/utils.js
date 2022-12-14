function timeConversion(time) {
  const timeTableConversion = {
    "12am": "00:00",
    "1am": "01:00",
    "2am": "02:00",
    "3am": "03:00",
    "4am": "04:00",
    "5am": "05:00",
    "6am": "06:00",
    "7am": "07:00",
    "8am": "08:00",
    "9am": "09:00",
    "10am": "10:00",
    "11pm": "11:00",
    "12pm": "12:00",
    "1pm": "13:00",
    "2pm": "14:00",
    "3pm": "15:00",
    "4pm": "16:00",
    "5pm": "17:00",
    "6pm": "18:00",
    "7pm": "19:00",
    "8pm": "20:00",
    "9pm": "21:00",
    "10pm": "22:00",
    "11pm": "23:00",
  };

  return timeTableConversion[time];
}

module.exports = { timeConversion };
