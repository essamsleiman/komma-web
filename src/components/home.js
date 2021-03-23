import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function Home() {

    function signin() {

    }

    return (
        <div> 
            <button onClick={signin}>Sign in with Google</button>
        </div>
    );
}

export default Home;
