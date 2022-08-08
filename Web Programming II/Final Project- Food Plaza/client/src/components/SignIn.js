import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div id="loginForm" className="formBox">
      <h1 className="pageTitle title">Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label hidden> Email:</label>
            <input
              className="formEntry"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
        </div>
        <div>
          <label hidden> Password:</label>
            <input
              className="formEntry"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
        </div>
        <div className="buttonGroup">
          <button className="button" type="submit">Log in</button>
          <button className="button forgotPassword" onClick={passwordReset}>Forgot Password</button>
          <SocialSignIn />
        </div>
      </form>
      <br />
    </div>
  );
}

export default SignIn;