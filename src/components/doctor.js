import { useContext, useState } from 'react';
import {CustomizedTables} from './table.js';
import {DoctorContext} from '../App.js';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import {Copyright} from './copyright.js';
import {AddDoctor} from './addDoctor.js';
import Box from '@material-ui/core/Box';
export function Doctor(){
    
    const doctor = useContext(DoctorContext);
    function createData(doctorName, qualification, speciality ) {
        return { doctorName, qualification, speciality  };
      }
    if(doctor!==[]){  
        var rows = doctor.map(ele=>createData(ele.doctorName,ele.qualification,ele.speciality))
    }
    const rowHead = ["Doctor name","Qualification","Specialty"];
    const [show,setShow] = useState("none");
    const addDoctor = () => {
      if(show==="none"){
        setShow("block");
      }else{
        setShow("none");
      }
    }
    return(
        <>
        <div style={{display:'flex',flexFlow:'row',justifyContent:'space-around'}}>
        <h1>Doctor</h1>
        <Button
        onClick={addDoctor}
        variant="contained"
        color="default"
        endIcon={<AddCircleOutlineIcon>Add</AddCircleOutlineIcon>}
      >
        Add
      </Button>
        </div>
        {doctor!==[]?(
            <CustomizedTables rows={rows} rowHead={rowHead}/>
        ):(
            <p>Nothing to display</p>
        )}
        <div style={{display:show}}>
          <AddDoctor />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        </>
    )
}