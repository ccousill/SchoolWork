import React from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import DeleteAccountButton from './DeleteAccount';

function Account() {
  return (
    <div className="formBox" id="accountOptions">
      <h2 className="pageTitle title" id="accountTitle">Account Page</h2>
      <ChangePassword />
      <DeleteAccountButton />
      <SignOutButton />
    </div>
  );
}

export default Account;