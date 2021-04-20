import react, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/top_bar.css";
import googleCompanyLogo from "../../img/google_company_logo.png";
import placeholderProfilePic from "../../img/placeholder_profile_pic.png";  

function TopBar(props) {

  const [respondAsGuest, setRespondAsGuest] = useState(false); 
  const [instructions, setInstructions] = useState('Connect your calendar to make checking your availability faster. Or, respond as a guest instead.'); 
  const [welcomeMessage, setWelcomeMessage] = useState(`😄 Hey there! Add times below to let ${props.meetingHostName} know what works best for you.`); 
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  
  function signInWithGoogle() {
    let localUserInfo = props.userInfo;
    localUserInfo.signedIn = true;
    props.setUserInfo(localUserInfo); 
    setWelcomeMessage(`😄 Hi ${props.userInfo.googleName.substring(0, props.userInfo.googleName.indexOf(' '))}! Add times below to let ${props.meetingHostName} know what works best for you.`); 
    setInstructions("Hit the purple button when you're finished to send your response. We'll send you a calendar invite soon!"); 
    props.setInputDisabled(false);
  }

  function changeResponseType() {
    let curResponseType = respondAsGuest
    if (curResponseType) {
      setInstructions("Hit the purple button when you’re finished to send your response. We’ll send you a calendar invite soon!"); 
    } else {
      setInstructions('Connect your calendar to make checking your availability faster. Or, respond as a guest instead.'); 
    }
    setRespondAsGuest(!curResponseType); 
  }

  // Abstracted userInfo with extra local states to prevent input errors with states passed down 
  function handleNameChange(event) {
    setName(event.target.value); 
    checkInfoProvided();
  }

  useEffect(() => {
    let localUserInfo = props.userInfo; 
    localUserInfo.name = name; 
    props.setUserInfo(localUserInfo); 
  }, [name]);

  function handleEmailChange(event) {
    setEmail(event.target.value); 
    checkInfoProvided();
  }

  useEffect(() => {
    let localUserInfo = props.userInfo; 
    localUserInfo.email = email; 
    props.setUserInfo(localUserInfo); 
  }, [email]);

  function checkInfoProvided() {
    if (name != "" && email != "") {
      props.setInputDisabled(false);
    }
  }

  return (
    <div className="top-content-container top-bar">
      <h3 className="bold">{welcomeMessage}</h3>
      <div className="backdrop">
        <div className="backdrop-content">
          <p className="white">{instructions}</p>
          {!props.userInfo.signedIn ? 
            !respondAsGuest ? 
              // Sign in with Google display 
              <>
                <button className="google-button" onClick={signInWithGoogle}>
                  <img src={googleCompanyLogo} className="google-company-logo" />
                  Sign In With Google
                </button>
                <p className="label alt-choice-text white" onClick={changeResponseType}>Respond as a guest instead</p>
              </> 
            :
              // Sign in as a guest display 
              <>
                <div className="input-container"> 
                  <p className="label field-spacing white">Name<span className="asterisk bold"> *</span></p> 
                  <input className="form-control" type="text" placeholder="Edward Chew" value={name} onChange={handleNameChange} /> 
                </div> 
                <div className="input-container second-container">
                  <p className="label field-spacing white">Email<span className="asterisk bold"> *</span></p> 
                  <input className="form-control" type="text" placeholder="edward@email.com" value={email} onChange={handleEmailChange} /> 
                </div>
                <p className="label alt-choice-text white" onClick={changeResponseType}>Sign in with Google instead</p>
              </>
            :
              // Signed in display 
              <>
                <img src={placeholderProfilePic} className="profile-pic"></img>
                <p className="label login-info white">Logged in as {props.userInfo.googleName} ({props.userInfo.googleEmail}) </p>
              </> 
          }
        </div>
      </div>
    </div>
  );
}

export default TopBar;