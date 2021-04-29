import React, { useContext } from 'react';
import firebase from "firebase/app"
import "firebase/auth"
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
  const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: {pathneme:"/"}};

      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }     
      const handleGoogleSignIn =() =>{
      const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const { displayName, email } = result.user;
    const signedInUser = {name: displayName, email }
    setLoggedInUser(signedInUser);
    storeAuthToken();
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
      }     

      const storeAuthToken = ()=>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          sessionStorage.setItem('token', idToken);
          history.replace(from);
        }).catch(function(error) {
     
        });
      }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;