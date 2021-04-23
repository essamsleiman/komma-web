import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./Redux/store";

import Navbar from "./components/navbar";
import Home from "./components/home";
import CreateMeeting from "./components/create_meeting";
import Availability from "./components/availability";
import axios from "axios";
import RouterPage from "./components/RouterPage.js";

function App() {
  return (
    <Provider store={store}>
      <div id="background">
        <div id="content-container">
          <div id="bg-circle"></div>
          <Navbar />
          <Router>
            <RouterPage />
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
