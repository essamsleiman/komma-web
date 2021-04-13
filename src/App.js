import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/navbar"
import Home from "./components/home"
import CreateMeeting from "./components/create_meeting" 
import Availability from "./components/availability"

import Navbar from "./components/navbar";
import axios from "axios";
function App() {
  return (
    <Provider store={store}>
      <div class="background">
        <div class="container-fluid">
          <Navbar />
          <Router>
            <RouterPage/>
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
