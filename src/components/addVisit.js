import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {DoctorContext} from './home.js'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {IdContext} from '../App.js';
import {GetVisitDataContext} from './home.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export function AddVisit() {
  const doctor = useContext(DoctorContext);
  const id = useContext(IdContext);
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    patientName: Yup.string().required('Patient name is required'),
    doctorName: Yup.string().required('Doctor name  is required'),
    visitCause: Yup.string().required('Visit cause  is required')
  })
  const {
    register,
    handleSubmit,
    formState : {errors}
    } = useForm({resolver : yupResolver(validationSchema)});
    const getVisitData = useContext(GetVisitDataContext);
    const t = localStorage.getItem("t");
    const onSubmit = (data) =>{
      fetch(`https://node-app-back-end-ak.herokuapp.com/visit/add/${id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'X-Auth-Token': t
        },
        body:JSON.stringify(data)
      }).then(res=>res.json())
      .then(res=>getVisitData())
      .catch(res=>console.log(res))
    }
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add visit 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("patientName")}
                // variant="outlined"
                fullWidth
                label="Patient name"
                autoFocus
              />
            {errors.patientName && (
                        <span style={{ color: "crimson" }}> {errors.patientName.message} </span>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl className={classes.margin}>
            <InputLabel id="demo-customized-select">Doctor name</InputLabel>  
              <NativeSelect
                // variant="outlined"
                labelId="demo-customized-select"
                fullWidth
                label="Doctor name"
                {...register("doctorName")}
              >
                  <option  value={""}></option >
              {doctor.map((ele)=>(
                  <option  value={ele.doctorName}>{ele.doctorName}</option >
              ))}
              {errors.doctorName && (
                        <span style={{ color: "crimson" }}> {errors.doctorName.message} </span>
              )}
              </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                fullWidth
                label="Visit cause"
                {...register("visitCause")}
              />
              {errors.visitCause && (
                        <span style={{ color: "crimson" }}> {errors.visitCause.message} </span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add visit
          </Button>
        </form>
      </div>
      
    </Container>
  );
}