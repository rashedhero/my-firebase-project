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

  const handleBur=(e)=>{
  console.log(e.target.name,e.target.value)
 if (e.target.name==='email'){

  const isEmailValid=/\S+@\S+\.\S+/.test(e.target.value);
  console.log(isEmailValid)
 }
   if (e.target.name==='password'){
  
    
 }

  }

  const handlesubmit=()=>{
   


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
  
    <h1>Our Own Autentification</h1>
     <form onsubmit={handlesubmit}>
     <input type="text" name="email" onChange={handleBur} placeholder ="your name" reqiured /> <br/>
     <input type="password"  name="password" onChange={handleBur}  placeholder= "Your password" required/><br/>
     
      <input type ="submit" value ="submit"/>

     </form>
      
    </div>
  );
}

export default App;
