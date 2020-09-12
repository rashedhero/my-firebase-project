import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";

import './App.css';
import firebaseConfig from './firebase.Config';

firebase.initializeApp(firebaseConfig);
function App() {
  const[user, setUser]=useState({
  isSignInUser:false,
  name:'',
  email:'',
  photo:''


  })
  const  provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn=()=>{
    
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const{displayName,email,photoURL}=res.user;
      console.log(displayName,email,photoURL)
     const SignInUser={
     isSignInUser:true,  
     name:displayName,
     email:email,
     photo:photoURL
   
    

     }
      
     setUser(SignInUser);

    })
    .catch(err=>{
     console.log(err)
     console.log(err.meassage)

    });
  }

  const handleSignOut=()=>{

    firebase.auth().signOut()
    
    .then(res=> {
     const SignOutUser={
      isSignInUser:false,
     name:'',
     email:'',
     photo:''

     }
    
    setUser(SignOutUser);
    })
    .catch(function(error) {
     
    });
    
  }
  return (
    <div >
     {
      user.isSignInUser ?<button onClick={handleSignOut}>Sign-out </button> :
     <button onClick={handleSignIn}>Sign-In </button>

     }
    
    
    {
    
   
     user.isSignInUser && <div>
     
      <p> Welcome,{user.name}</p>
      <p>Email:{user.email}</p>
      <p>photo: <img src={user.photo} alt=""></img> </p>
      </div>
    }

    </div>
  );
}

export default App;
