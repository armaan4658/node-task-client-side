import './App.css';
import {SignIn} from './components/signIn.js';
import {SignUp} from './components/signUp.js';
import {ForgotPassword} from './components/forgotPassword.js';
import {Home} from './components/home.js';
import {VerifyAccount} from './components/verifyAccount.js';
import {ResetPassword} from './components/resetPassword.js';
import {
  Route,
  Switch
} from 'react-router-dom';
import React, { useState } from 'react';
export const IdContext = React.createContext(null);
export const SetIdContext = React.createContext(null);
function App() {
  const [id,setId] = useState("");
  return (
    <div className="App">
      <IdContext.Provider value={id}>
       <SetIdContext.Provider value={setId}>
       <Switch>
        <Route exact path='/'>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/forgotpassword'>
          <ForgotPassword/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path="/verifyaccount/:id">
          <VerifyAccount />
        </Route>
        <Route path="/passwordreset/:id">
          <ResetPassword />
        </Route>
       </Switch>
      </SetIdContext.Provider>
     </IdContext.Provider>
    </div>
  );
}

export default App;
