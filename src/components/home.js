import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";

function Home() {

    function signin() {

    }

    return (
        <div> 
            <button  
                // onClick={() => {
                //     window.open("http://localhost:5000/auth/google", "_self");
                // }}

                onClick={() => {
                  axios.get("http://localhost:5000/auth/google").then((response) => {

                      if (response) {
                        console.log("ESSAM RESPONSE: ",response)
                      } else {
                        console.log("no response from server");
                      }
                    });
              //window.open("http://localhost:5000/auth/events", "_self");
                }}
                >
              Sign in with Google
              </button>
              <button
                    onClick={() => {
                        axios.get("http://localhost:5000/auth/events").then((response) => {
      
                            if (response) {
                              console.log(response)
                            } else {
                              console.log("no response from server");
                            }
                          });
                    //window.open("http://localhost:5000/auth/events", "_self");
                }}>
              Sync with Calendar
              </button>
        </div>
    );
}

export default Home;


 