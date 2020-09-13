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
  let isFieldValid=true;
 if (e.target.name==='email'){

  isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
  
 }
   if (e.target.name==='password'){
    isFieldValid=e.target.value.length>6;
  
 }
 if (isFieldValid){
  const newUserInfo={...user}
  newUserInfo[e.target.name]=e.target.value;
  setUser(newUserInfo);

 }

  }

  const handlesubmit=(e)=>{
   if(user.email && user.password){
   
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
    .then(res=>{
      console.log(res)
    })
    .catch(function(error) {
     
      const newUserInfo={...user};
      newUserInfo.error=error.meassage;
      setUser(newUserInfo)
      
      console.log(newUserInfo);
    });

   }
   
   e.preventDefault();

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
    {/* <p>Name:{user.name}</p>
    <p>email:{user.email}</p>
    <p>password:{user.password}</p> */}
     <form onSubmit={handlesubmit}>
       <input type="text" name="name" onChange={handleBur} placeholder="your name"/> <br/>
     <input type="text" name="email" onChange={handleBur} placeholder ="your name" reqiured /> <br/>
     <input type="password"  name="password" onChange={handleBur}  placeholder= "Your password" required/><br/>
     
      <input type ="submit" value ="submit"/>

     </form>
      
    </div>
  );
}

export default App;
