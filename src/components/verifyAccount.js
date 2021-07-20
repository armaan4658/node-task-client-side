import React, {  useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {Copyright} from './copyright.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function VerifyAccount() {
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    otp: Yup.number().required()
  })
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm({resolver : yupResolver(validationSchema)});
  const {id} = useParams();
  const [hospitalData,setHospitalData] = useState({});
  const getHospitalData=()=>{
    fetch(`https://node-app-back-end-ak.herokuapp.com/hospital/get/${id}`,{method:'GET'})
    .then(res=>res.json())
    .then(res=>setHospitalData(res))
    .catch(res=>console.log(res))
  }
  getHospitalData();
   const hospitalEmail = hospitalData.hospitalEmail;
   const [msg,setMsg] = useState("");
  const onSubmit = (data) => {
    const otp=data.otp;
    console.log({otp,hospitalEmail});
      fetch(`https://node-app-back-end-ak.herokuapp.com/hospital/otp`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({otp,hospitalEmail})
      }).then(res=>res.json())
      .then(res=>setMsg(res))
      .catch(res=>console.log(res))
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Verify account <br/>
            <p>{msg.message==="green"?"Account verified":""}</p>
            <p>{msg.message==="OTP entered is incorrect"?msg.message:""}</p>
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Enter OTP"
                type="number"
                {...register("otp")}
              />
              {errors.otp && (
                        <span style={{ color: "crimson" }}> {errors.otp.message} </span>
              )}
            </Grid>
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Verify OTP
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}