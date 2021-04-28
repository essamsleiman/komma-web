import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import komma_logo from "../img/komma_logo.svg";
import PropTypes from "prop-types";
import { fetchUser } from "../../src/Redux/actions/userActions";
import { connect } from "react-redux";

function Navbar(props) {

  useEffect(() => {
   props.fetchUser()
  }, []);


  return (
    <nav>
      <div className="nav-bar row no-gutters">
        <div className="left col">
          <a className="home-link clickable">
            <img
              className="logo"
              onClick={() => (window.location = "/")}
              src={komma_logo}
            />
          </a>
          <div className="beta-text clickable" onClick={() => (window.location = "/")}>
            <h3 className="bold komma">Komma</h3>
            <p className="beta">beta</p>
            <p className="tiny version">v1.0</p>
          </div>
        </div>
        <div className="right col">
          <a href="/create">+ New Meeting</a>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { fetchUser })(Navbar);
