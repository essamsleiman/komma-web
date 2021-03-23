import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/home"
import Create_meeting from "./components/create_meeting" 
import Navbar from "./components/navbar"

function App() {

  return (
    <div class="background">
      <div class="container-fluid">
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={Create_meeting} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
