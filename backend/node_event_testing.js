const { google } = require("googleapis");
const { calendar } = require("googleapis/build/src/apis/calendar");

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth;

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  "619278648051-qiilealfrh111ajs6ujvn2kam92qevtq.apps.googleusercontent.com",
  "dhdDPzuhWGs1vz5q1xzts6AM"
);


oAuth2Client.setCredentials({
  access_token:
    "",
  refresh_token:
    "",
});

// Create a new calender instance.
listEvents(oAuth2Client);

function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );

  // this is the event generation template:
  var newevent = {
    // summary is the name of the event
    summary: "Google I/O 2015",
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: "2021-04-01T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2021-04-01T09:00:00-09:00",
      timeZone: "America/Los_Angeles",
    },
    // you can pass in attendee emails here, or with other parameters as well outlined in the google API documenation
    attendees: [{ email: "komma.app@gmail.com" }],
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
  calendar.events.insert(
    {
      // auth is auth details
      auth: auth,
      // we want the primary calendar
      calendarId: "primary",
      // resource field is the template up above
      resource: newevent,
      // this should be set to 1 to allow for meet creation
      conferenceDataVersion: 1,
    },
    function (err, event) {
      if (err) {
        console.log("there was an error with inserting an event: ", +err);
        return;
      }
      console.log("Event created!");
    }
  );
}