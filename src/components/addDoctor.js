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
import {IdContext,GetDoctorDataContext} from '../App.js';

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

export function AddDoctor() {
  const id = useContext(IdContext);
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    doctorName: Yup.string().required('Doctor name is required'),
    qualification: Yup.string().required('Qualification  is required'),
    speciality: Yup.string().required('Specialty is required')
  })
  const {
    register,
    handleSubmit,
    formState : {errors}
    } = useForm({resolver : yupResolver(validationSchema)});
    const t = localStorage.getItem("t");
    const getHospitalData = useContext(GetDoctorDataContext);
    const onSubmit = (data) =>{
      fetch(`https://node-app-back-end-ak.herokuapp.com/doctor/add/${id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'X-Auth-Token': t
        },
        body:JSON.stringify(data)
      }).then(res=>res.json())
      .then(res=>getHospitalData())
      .catch(res=>console.log(res))
    }
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add doctor 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("doctorName")}
                variant="outlined"
                fullWidth
                label="Doctor name"
                autoFocus
              />
            {errors.doctorName && (
                        <span style={{ color: "crimson" }}> {errors.doctorName.message} </span>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...register("qualification")}
                    variant="outlined"
                    fullWidth
                    label="Qualification"
                    autoFocus
                  />
                {errors.qualification && (
                            <span style={{ color: "crimson" }}> {errors.qualification.message} </span>
                )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Speciality"
                {...register("speciality")}
              />
              {errors.speciality && (
                        <span style={{ color: "crimson" }}> {errors.speciality.message} </span>
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
            Add doctor
          </Button>
        </form>
      </div>
      
    </Container>
  );
}