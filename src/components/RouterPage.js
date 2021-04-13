import React from "react";
import {Switch, Route} from "react-router-dom";
import eventPage from "./eventPage";
import Home from "./home";
import Create_meeting from "./create_meeting";


export default function RouterPage(props) {

    return (
        <Switch>
            
            <Route
              exact path="/events/:eventid"
              render={(props) => <eventPage {...props}/>}
            />
            <Route
                exact path="/events"
                render={(props) => <eventPage {...props}/>}
            />
            <Route exact path="/event" component={eventPage} />
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={Create_meeting} />
        </Switch>
    )
}