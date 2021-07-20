import {CustomizedTables} from './table.js';
import { useContext, useState } from 'react';
import {VisitContext} from '../App.js';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import {AddVisit} from './addVisit.js';
import {Copyright} from './copyright.js';
import Box from '@material-ui/core/Box';
export function Visit(){
    const visit = useContext(VisitContext);
    function createData(patientName, cause, time, doctor ) {
        return { patientName, cause, time, doctor  };
      }
    if(visit!==[]){
        var rows = visit.map(ele=>createData(ele.patientName,ele.visitCause,ele.visitTime,ele.doctorName))
    }
    const [show,setShow] = useState("none")
    const addVisit = () => {
        if(show==="none"){
            setShow("block")
        }else{
            setShow("none")
        }
    }
    const rowHead = ["Patient","Cause","Time","Doctor"];
    return(
        <>
        <div style={{display:'flex',flexFlow:'row',justifyContent:'space-around'}}>
        <h1>visit</h1>
        {/* <Link to={`${url}/add/${id}`}> */}
        <Button
        // style={{background:'black'}}
        onClick={addVisit}
        variant="contained"
        color="default"
        endIcon={<AddCircleOutlineIcon>Add</AddCircleOutlineIcon>}
      >
        Add
      </Button>
      {/* </Link> */}
        </div>
        {visit!==[]?(
        <CustomizedTables rows={rows} rowHead={rowHead}/>
        ):(
        <p>Nothing to display</p>
        )}
        <div style={{display:show}}>
            <AddVisit/>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        </>
    )
}