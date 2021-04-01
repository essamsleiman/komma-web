import react, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LeftBar from "./availability/left_bar"
import TopBar from "./availability/top_bar"
import "./css/availability.css";

function Availability() {

  return (
    <div>
        <div className="row no-gutters justify-content-center shadow-card top-margin">
            <div className="col-3">
                <LeftBar />
            </div>
            <div className="col-9">
                <div className="vertical-bar"></div>
                <TopBar />
            </div>
        </div>
    </div>
  );
}

export default Availability;