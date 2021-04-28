import React from "react";
import { Switch, Route } from "react-router-dom";
import EventPage from "./eventPage";
import Home from "./home";
import Create_meeting from "./create_meeting";
import Availability from "./availability";
import PrivacyPolicy from "./privacy_policy"; 
import TermsOfService from "./terms_of_service"; 

export default function RouterPage(props) {
  return (
    <Switch>
      <Route
        exact
        path="/events/:eventId"
        component={(props) => <EventPage {...props} />}
      />
      <Route
        exact
        path="/events"
        // render={(props) => <eventPage {...props}/>}
        component={(props) => <EventPage {...props} />}
      />
      <Route
        exact
        path="/availability/:eventId"
        component={(props) => <Availability {...props} />}
      />
      {/* <Route exact path="/event" component={eventPage} /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/create" component={Create_meeting} />
      <Route exact path="/availability" component={Availability} />
      <Route exact path="/privacy_policy" component={PrivacyPolicy} /> 
      <Route exact path="/terms_of_service" component={TermsOfService} /> 
    </Switch>
  );
}
