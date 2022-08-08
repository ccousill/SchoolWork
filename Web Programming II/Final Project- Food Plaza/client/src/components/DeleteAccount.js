import React from 'react';
import { doDeleteAccount } from '../firebase/FirebaseFunctions';

const DeleteAccountButton = () => {
  return (
    <button className="button" id="deleteAccount" type="button" onClick={doDeleteAccount}>
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;