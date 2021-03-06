import React, {useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ADRESS } from '../config';

import '../custom.css';

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

function GoogleLoginComponent() {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Success Handler
  let responseGoogleSuccess = (response) => {
    let id = response.profileObj.googleId;
    //kollar om användaren som försöker logga in är medlem
    axios.get(API_ADRESS + '/api/profile/googleID/' + id)
    .then(res => {
      console.log(res)
      // Set the API-key header in axios.
      axios.defaults.headers.common['ApiKey'] = res.data;
      localStorage.setItem("ApiKey", res.data)

      // Save profileId in localStorage.
      const profileId = res.data.split('_')[0];
      localStorage.setItem("profileId", profileId); 

      navigate('/explore');
      })

      .catch(function (error){
        console.log(error)
          if(error.response.status === 404){
            setError("You are not a registered user.");
          }
          console.log(error);
      });
  };

  // Error Handler
  let responseGoogleError = (response) => {
    console.log(response);
  };

    return (

        <div>
        <p className='err-text'>{error}</p>
          
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Log In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              isSignedIn={false}
              cookiePolicy={"single_host_origin"}
            />
          
        </div>

    );
  }
export default GoogleLoginComponent;