import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Student from './components/StudentDashboard';
import Instructor from './components/InstructorDashboard';
import Admin from './components/AdminDashboard';
import { useState } from 'react';
//import UserProfile from './components/UserProfile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './App.css';




function App() {
  // const [user, setUser] = useState({
  //   username: '',
  //   password: '',
  //   role: '',
  // });
  // setUser({
  //   username: UserProfile.getUserName(),
  //   password: UserProfile.getPassword(),
  //   role: UserProfile.getRole(),
  // });
  var isUserLoggedIn = false;
  var logUserIn = (function(isTrue: boolean){
    console.log("User is logged in");
    isUserLoggedIn = isTrue;
  })
  var logUserOut = (function(isFalse: boolean){
    console.log("User is logged out");
    isUserLoggedIn = isFalse;
  })
  var getUserStatus = (function(){
    return isUserLoggedIn;
  })
  var userLoginUtility = {
    logUserIn: logUserIn,
    logUserOut: logUserOut,
    getUserStatus: getUserStatus
  }
  type UserLoginUtility = {
    logUserIn: (isTrue: boolean) => void,
    logUserOut: (isFalse: boolean) => void,
    getUserStatus: () => boolean
  }

  interface UserLoginUtilityProps {
    userLoginUtility: UserLoginUtility
  }

  return (
    <div className="App">
      {/* <Router basename='/lm-deploy'> */}
        <Routes>
          <Route path="/" element = {<SignIn userLoginUtility={userLoginUtility}/>}/>
          <Route path="/signup" element = {<SignUp/>}/>
          <Route path="/student" element = {<Student userLoginUtility={userLoginUtility}/>}/>
          <Route path="/instructor" element = {<Instructor userLoginUtility={userLoginUtility}/>}/>
          <Route path="/admin" element = {<Admin userLoginUtility={userLoginUtility}/>}/>
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
