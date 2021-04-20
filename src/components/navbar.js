import "bootstrap/dist/css/bootstrap.min.css";
import './css/navbar.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import komma_logo from "../img/komma_logo.svg"

function Navbar() {
  return (
    <nav> 
      <div className="nav-bar row no-gutters">
        <div className="left col">
          <a>
            <img className="logo" onClick={() => window.location="/"} src={komma_logo}/>
          </a>
        </div>
        <div className="right col">
          <a href="/create">+ New Meeting</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
