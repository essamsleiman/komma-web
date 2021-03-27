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
            <img src={komma_logo}/>
          </a>
        </div>
        <div className="right col">
          <a href="">+ New Meeting</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
