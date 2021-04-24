import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import komma_logo from "../img/komma_logo.svg";

function Navbar() {
  return (
    <nav>
      <div className="nav-bar row no-gutters">
        <div className="left col">
          <a className="home-link">
            <img
              className="logo"
              onClick={() => (window.location = "/")}
              src={komma_logo}
            />
          </a>
          <h3 className="bold beta-text">
            Komma <span className="bold beta">beta</span>
            <span className="tiny version">v1.0</span>
          </h3>
        </div>
        <div className="right col">
          <a href="/create">+ New Meeting</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
