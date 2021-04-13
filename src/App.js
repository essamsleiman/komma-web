import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import RouterPage from "./components/RouterPage";

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
