import react, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/top_bar.css";
import googleCompanyLogo from "../../img/google_company_logo.png";
import placeholderProfilePic from "../../img/placeholder_profile_pic.png";

function TopBar(props) {
  console.log(props.viewingGroup); 
  const [respondAsGuest, setRespondAsGuest] = useState(false);
  const [instructions, setInstructions] = useState(
    "Connect your calendar to make checking your availability faster. Or, respond as a guest instead."
  );
  const [welcomeMessage, setWelcomeMessage] = useState(
    props.isMeetingHost
      ? `😄 Hi ${props.meetingHostName}! Welome to your meeting's response page.`
      : `😄 Hey there! Add times below to let ${props.meetingHostName} know what works best for you.`
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  var inviteLink = `komma.com${props.urlId}`;
  const [linkFieldContent, setLinkFieldContent] = useState(inviteLink);

  function signInWithGoogle() {
    let localUserInfo = props.userInfo;
    localUserInfo.signedIn = true;
    props.setUserInfo(localUserInfo);
    setWelcomeMessage(
      `😄 Hi ${props.userInfo.googleName.substring(
        0,
        props.userInfo.googleName.indexOf(" ")
      )}! Add times below to let ${
        props.meetingHostName
      } know what works best for you.`
    );
    setInstructions(
      "Hit the purple button when you're finished to send your response. We'll send you a calendar invite soon!"
    );
    props.setInputDisabled(false);
  }

  function changeResponseType() {
    let curResponseType = respondAsGuest;
    if (curResponseType) {
      setInstructions(
        "Hit the purple button when you’re finished to send your response. We’ll send you a calendar invite soon!"
      );
    } else {
      setInstructions(
        "Connect your calendar to make checking your availability faster. Or, respond as a guest instead."
      );
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

  function handleCopyButtonClick(event) {
    navigator.clipboard.writeText(inviteLink);
    setLinkFieldContent("Copied!");
    setTimeout(() => setLinkFieldContent(inviteLink), 1500);
    return;
  }

  // console.log(props.isMeetingHost, props.userInfo.signedIn);

  return (
    <div className="top-content-container top-bar">
      <h3 className="bold">
        {props.viewingGroup ? 
            `💼 Here's what the the group's responses look like.`
          : 
            welcomeMessage
        }
      </h3>
      {!props.viewingGroup ? ( 
        <div className="backdrop">
          <div className="backdrop-content">
            {!props.isMeetingHost && !props.userInfo.signedIn ? (
              <p className="white">{instructions}</p>
            ) : null}
            {!props.isMeetingHost && !props.userInfo.signedIn ? (
              !respondAsGuest ? (
                // Sign in with Google display
                <>
                  <button
                    className="google-button"
                    onClick={() => {
                      window.open("http://localhost:5000/auth/google", "_self");
                    }}
                  >
                    <img
                      src={googleCompanyLogo}
                      className="google-company-logo"
                    />
                    Sign In With Google
                  </button>
                  <p
                    className="label alt-choice-text white"
                    onClick={changeResponseType}
                    style={{display: 'none'}} /* make guest response option invisible */ 
                  >
                    Respond as a guest instead
                  </p>
                </>
              ) : (
                // Sign in as a guest display
                <>
                  <div className="input-container">
                    <p className="label field-spacing white">
                      Name<span className="asterisk bold"> *</span>
                    </p>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Edward Chew"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="input-container second-container">
                    <p className="label field-spacing white">
                      Email<span className="asterisk bold"> *</span>
                    </p>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="edward@email.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <p
                    className="label alt-choice-text white"
                    onClick={changeResponseType}
                  >
                    Sign in with Google instead
                  </p>
                </>
              )
            ) : props.isMeetingHost ? (
              // Signed in meeting host
              <>
                <div className="number-circle">1</div>
                <p className="inline-p">Add your availability.</p>
                <br />
                <div className="number-circle">2</div>
                <p className="inline-p">
                  Share the link below with those attending your meeting.
                </p>
                <div className="row no-gutters">
                  <div className="col-6">
                    <div className="input-group invite-link">
                      <input
                        type="text"
                        id="top-link-input"
                        className={
                          "form-control invite-field top-invite-field" +
                          (linkFieldContent == "Copied!" ? "copied" : "")
                        }
                        value={linkFieldContent}
                      />
                      <div className="input-group-append">
                        <button
                          className="top-copy-button hollow-button"
                          type="button"
                          onClick={handleCopyButtonClick}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Signed in display
              <>
                <img src={placeholderProfilePic} className="profile-pic"></img>
                <p className="label login-info white">
                  Logged in as {props.userInfo.googleName} (
                  {props.userInfo.googleEmail}){" "}
                </p>
              </>
            )}
          </div>
        </div>)
        :
          <></> 
      }
    </div>
  );
}

export default TopBar;