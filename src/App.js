import { useState, useEffect } from "react";
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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth); 

  useEffect(() => {
    function handleResize() {
      // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight) 
      setScreenWidth(window.innerWidth); 
    }
  
    window.addEventListener('resize', handleResize)
  })

  console.log(window.location); 

  return (
    <Provider store={store}>
      <div id="background">
        <div id="content-container"> 
          { window.location.pathname != "/privacy_policy" && window.location.pathname != "/terms_of_service" ? 
            <div id="bg-circle"></div>
          :
            null
          }
          <Navbar />
          { screenWidth > 700 ? 
          (<Router>
              <RouterPage />
            </Router>)
          :
            <h3>Unfortunately, Komma isn't ready for mobile viewports yet. Check back soon!</h3> 
          }
        </div>
      </div>
    </Provider>
  );
}

export default App;
