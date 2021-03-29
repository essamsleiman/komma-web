const { google } = require('googleapis');
const { calendar } = require('googleapis/build/src/apis/calendar');

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  '619278648051-qiilealfrh111ajs6ujvn2kam92qevtq.apps.googleusercontent.com',
  'dhdDPzuhWGs1vz5q1xzts6AM'
)

// these are the credentials from the quickstart code:

oAuth2Client.setCredentials({
    access_token: 'ya29.a0AfH6SMA_O-KVhlIS0l-zj8fpcSKeSUWxjYf-OS6zmDr8SMx2U7fvOyIbdgXlhO5mgkwTCrx-Ho2uRNCY6IDjctkHeLqNA78-74oIb3veqJI6bl7lo73M-X0Tm5r6TTNs2tGgzHGd78eRX5LQoic1uPKHupLU',
    refresh_token: '1//06XNJz_XXs9myCgYIARAAGAYSNwF-L9IrDOXmQaaVJGMNNSfDRJ0kwUxSBSPffO-j3nYZMUJxi4zrpTNaMYV0N5wpzStRivj0ocA',
})


  // Create a new calender instance.
listEvents(oAuth2Client);

function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });

    // this is the event generation template:
    var newevent = {
      // summary is the name of the event
      'summary': 'Google I/O 2015',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2021-04-01T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2021-04-01T09:00:00-09:00',
        'timeZone': 'America/Los_Angeles',
      },
      // you can pass in attendee emails here, or with other parameters as well outlined in the google API documenation
      'attendees': [
        {'email': 'komma.app@gmail.com'},
      ],
      // this field is to create the google meet things (don't edit this its really senitive for some)
      conferenceData: {
        createRequest: {
          // request ID is just a randomly generated string
          requestId: "sample123",
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    // this line inserts the event into the calendar
    calendar.events.insert({
      // auth is auth details
      auth: auth,
      // we want the primary calendar
      calendarId: 'primary',
      // resource field is the template up above
      resource: newevent,
      // this should be set to 1 to allow for meet creation
      conferenceDataVersion: 1,
    }, function(err, event) {
      if (err) {
      console.log("there was an error with inserting an event: ", + err);
      return;
    }
    console.log('Event created!' );
    })
  }


// // Create a new event start date instance for temp uses in our calendar.
// const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 2)

// // Create a new event end date instance for temp uses in our calendar.
// const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 4)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// // Create a dummy event for temp uses in our calendar
// const event = {
//   summary: `Meeting with David`,
//   location: `3595 California St, San Francisco, CA 94118`,
//   description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
//   colorId: 1,
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/Denver',
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'America/Denver',
//   },
// }

// // Check if we a busy and have an event on our calendar for the same time.
// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'America/Denver',
//       items: [{ id: 'primary' }],
//     },
//   },
//   (err, res) => {
//     // Check for errors in our query and log them if they exist.
//     if (err) return console.error('Free Busy Query Error: ', err)

//     // Create an array of all events on our calendar during that time.
//     const eventArr = res.data.calendars.primary.busy

//     // Check if event array is empty which means we are not busy
//     if (eventArr.length === 0)
//       // If we are not busy create a new calendar event.
//       return calendar.events.insert(
//         { calendarId: 'primary', resource: event },
//         err => {
//           // Check for errors and log them if they exist.
//           if (err) return console.error('Error Creating Calender Event:', err)
//           // Else log that the event was created.
//           return console.log('Calendar event successfully created.')
//         }
//       )

//     // If event array is not empty log that we are busy.
//     return console.log(`Sorry I'm busy...`)
//   }
// )