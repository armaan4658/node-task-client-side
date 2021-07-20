import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as Connect} from 'react-router-dom';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUp() {
  const classes = useStyles();
  const [msg,setMsg] = useState("");
  const validationSchema = Yup.object().shape({
    hospitalName: Yup.string().required('Hospital name is required'),
    hospitalLocation: Yup.string().required('Hospital location is required'),
    hospitalEmail: Yup.string().required('Hospital email is required'),
    password:Yup.string().required('Password is required'),
    confirmPassword:Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password must match")
  })
  const {
    register,
    handleSubmit,
    formState : {errors}
    } = useForm({resolver : yupResolver(validationSchema)});
    const onSubmit = (data) =>{
      fetch(`https://node-app-back-end-ak.herokuapp.com/hospital/signup`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }).then(res=>res.json())
      .then(res=>setMsg(res.message))
      .catch(res=>console.log(res))
    }
    const showMessage = () =>{
      setTimeout(()=>setMsg(""),1000*10);
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up <br/>
          {msg.message==="green"?<p>A verification email has been sent to your account</p>:<p>{msg.message}</p>}
          {msg.message==="green"?showMessage():''}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("hospitalName")}
                variant="outlined"
                fullWidth
                label="Hospital name"
                autoFocus
              />
            {errors.hospitalName && (
                        <span style={{ color: "crimson" }}> {errors.hospitalName.message} </span>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Hospital location"
                {...register("hospitalLocation")}
              />
              {errors.hospitalLocation && (
                        <span style={{ color: "crimson" }}> {errors.hospitalLocation.message} </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                {...register("hospitalEmail")}
              />
              {errors.hospitalEmail && (
                        <span style={{ color: "crimson" }}> {errors.hospitalEmail.message} </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                        <span style={{ color: "crimson" }}> {errors.password.message} </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Confirm password"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                        <span style={{ color: "crimson" }}> {errors.confirmPassword.message} </span>
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
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                  <Connect to='/'>
                        Already have an account? Sign in
                  </Connect>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}