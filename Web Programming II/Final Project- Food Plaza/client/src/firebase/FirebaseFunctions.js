import firebase from 'firebase/app';
import axios from 'axios';

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.auth().currentUser.updateProfile({ displayName: displayName });
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === 'google') {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  }
  var user = await firebase.auth().signInWithPopup(socialProvider);
  await axios.post('http://localhost:4000/users/createUserWithSocial', {uid:user.user.uid, displayName:user.user.displayName})
      .then((res) => {
        window.location.href = '/';
      }).catch((error) => {
        alert("Could not create social account")
        console.log(error)
  });
}

async function doPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
}

async function doDeleteAccount() {
  var user = firebase.auth().currentUser;
  let token = await user.getIdToken();
  await firebase.auth().currentUser.delete().then(async ()=>{
    await axios.delete(`http://localhost:4000/users/${user.uid}`, {data: {token: token}})
    .then((res) => {
      window.location.href = '/';
    }).catch((error) => {
      alert("Could not delete account")
      console.log(error)
    });
  }).catch((error) => {
    alert("Could not delete account from Firebase. This may be due to your session being stale. Please try signing in again.");
    console.log(error)
  });
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
  doDeleteAccount
};