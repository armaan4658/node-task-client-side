import React, { useContext, useEffect, useState } from 'react';
import {IdContext} from '../App.js';
import {NavBar} from './navbar.js';

export const DoctorContext = React.createContext(null);
export const VisitContext = React.createContext(null);
export const GetVisitDataContext = React.createContext(null);
export const GetDoctorDataContext = React.createContext(null);
export function Home(){
    const id = useContext(IdContext);
    const [visit,setVisit] = useState([]);
    const [doctor,setDoctor] = useState([]);
    const t = localStorage.getItem("t");
    const getVisitData = () =>{
       fetch(`https://node-app-back-end-ak.herokuapp.com/visit/get/${id}`,{
           method:'GET',
           headers:{
            'X-Auth-Token':t
           }
       }).then(res=>res.json())
       .then(res=>setVisit(res))
       .catch(res=>console.log(res))
    }
    const getHospitalData = () => {
        fetch(`https://node-app-back-end-ak.herokuapp.com/doctor/get/${id}`,{
            method:'GET',
            headers:{
                'X-Auth-Token':t
            }
        }).then(res=>res.json())
        .then(res=>setDoctor(res))
        .catch(res=>console.log(res))
    }
    useEffect(getVisitData,[]);
    useEffect(getHospitalData,[]);
    return(
        <>
            <DoctorContext.Provider value={doctor}>
                <VisitContext.Provider value={visit}>
                    <GetVisitDataContext.Provider value={getVisitData}>
                        <GetDoctorDataContext.Provider value={getHospitalData}>
                                <NavBar/>
                        </GetDoctorDataContext.Provider>
                    </GetVisitDataContext.Provider>
                </VisitContext.Provider>
            </DoctorContext.Provider>
        </>
    )
}