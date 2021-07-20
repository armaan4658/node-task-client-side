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
export const DoctorContext = React.createContext(null);
export const VisitContext = React.createContext(null);
export const GetVisitDataContext = React.createContext(null);
export const SetVisitDataContext = React.createContext(null);
export const GetDoctorDataContext = React.createContext(null);
export const SetDoctorDataContext = React.createContext(null);
function App() {
  const [id,setId] = useState("");
  const [visit,setVisit] = useState([]);
  const [doctor,setDoctor] = useState([]);
  const getVisitData = () =>{
    fetch(`https://node-app-back-end-ak.herokuapp.com/visit/get/${id}`,{
        method:'GET',
        headers:{
         'X-Auth-Token':localStorage.getItem("t")
        }
    }).then(res=>res.json())
    .then(res=>setVisit(res))
    .catch(res=>console.log(res))
 }
 const getHospitalData = () => {
     fetch(`https://node-app-back-end-ak.herokuapp.com/doctor/get/${id}`,{
         method:'GET',
         headers:{
             'X-Auth-Token':localStorage.getItem("t")
         }
     }).then(res=>res.json())
     .then(res=>setDoctor(res))
     .catch(res=>console.log(res))
 }
  return (
    <div className="App">
      <IdContext.Provider value={id}>
       <SetIdContext.Provider value={setId}>
        <DoctorContext.Provider value={doctor}>
         {/* <SetDoctorDataContext.Provider value={setDoctor}> */}
          <VisitContext.Provider value={visit}>
           {/* <SetVisitDataContext.Provider value={setVisit}> */}
            <GetVisitDataContext.Provider value={getVisitData}>
             <GetDoctorDataContext.Provider value={getHospitalData}>
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
            </GetDoctorDataContext.Provider>
           </GetVisitDataContext.Provider>
          {/* </SetVisitDataContext.Provider> */}
         </VisitContext.Provider>
        {/* </SetDoctorDataContext.Provider> */}
       </DoctorContext.Provider>
      </SetIdContext.Provider>
     </IdContext.Provider>
    </div>
  );
}

export default App;
