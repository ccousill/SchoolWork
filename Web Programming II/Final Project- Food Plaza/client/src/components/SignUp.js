import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
import axios from 'axios';

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const [displayNameVal, setDisplayNameVal] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
    setDisplayNameVal(displayName.value);
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        displayName.value
      );


    } catch (error) {
      alert(error);
    }
  };

  if (currentUser && displayNameVal) {
    axios.post('http://localhost:4000/users', {uid: currentUser.uid, displayName: displayNameVal})
            .then((res) => {
                window.location.href = '/';
            }).catch((error) => {
                alert("Could not sign up")
                console.log(error)
            });
    return <Redirect to="/" />;
  }

  return (
    <div class="formBox" id="signUpForm">
      <h1 class="pageTitle title">Sign up</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div>
          <label hidden>Name:</label>
            <input
              className="formEntry"
              required
              name="displayName"
              type="text"
              placeholder="Name"
            />
        </div>
        <div>
          <label hidden>Email:</label>
            <input
              className="formEntry"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
        </div>
        <div>
          <label hidden>Password:</label>
            <input
              className="formEntry"
              id="passwordOne"
              name="passwordOne"
              type="password"
              placeholder="Password"
              required
            />
        </div>
        <div>
          <label hidden>Confirm Password:</label>
            <input
              className="formEntry"
              name="passwordTwo"
              type="password"
              placeholder="Confirm Password"
              required
            />
        </div>
        <div class="buttonGroup">
          <button id="submitButton" class="button" name="submitButton" type="submit">Sign Up</button>
          <SocialSignIn />
        </div>
      </form>
      <br />
    </div>
  );
}

export default SignUp;