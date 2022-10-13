import app from './firebase/firebase.init';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'; 
import './App.css';
import { useState } from 'react';
const auth = getAuth(app);
function App() {
  const [user, setUser]= useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn =()=>{
    signInWithPopup(auth, googleProvider)
      .then(result =>{
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error =>{
        console.log("error :", error);
      })
  }
  const handleGithubSignIn =()=>{
    signInWithPopup(auth, githubProvider)
      .then(result =>{
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error =>{
        console.log("error :", error);
      })
  }

  const handleSignOut =() =>{
    signOut(auth)
      .then(() =>{
        setUser({})
      })
      .catch(()=>{
        setUser({})
      })
  }

  return (
    <div className="App">


      {  user.uid ?
          <button onClick={handleSignOut}>Sign Out Google</button> 
          :
          <div>
            <button onClick={handleGoogleSignIn}>Sign With Google</button>
            <button onClick={handleGithubSignIn}>Sign With GitHub</button>
          </div>
           
        
      }
      {
        user.uid && <div> 
          <h3>User name: {user.displayName}</h3>
          <p>Email address: {user.email}</p>
        </div>
      }
    
    </div>
  );
}

export default App;
