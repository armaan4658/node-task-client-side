import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function ForgotPassword() {
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    hospitalEmail: Yup.string().required().email('Please enter a valid email')
  })
  const [msg,setMsg] = useState({});
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm({resolver : yupResolver(validationSchema)});
  const onSubmit = (data) => {
      fetch(`https://node-app-back-end-ak.herokuapp.com/hospital/passwordreset/${data.hospitalEmail}`,{method:'GET'})
      .then(res=>res.json())
      .then(res=>setMsg(res))
      .catch(res=>res.json())
  }
  const showMessage = () =>{
    setTimeout(()=>setMsg(""),1000*10);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          <p>{msg.message==="green"?"An password reset link has been sent to your email":""}</p>
          {msg.message==="green"?showMessage():''}
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password 
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoFocus
            {...register("hospitalEmail")}
          />
          {errors.hospitalEmail && (
              <span style={{ color: "crimson" }}> {errors.hospitalEmail.message} </span>
          )}
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send password reset link
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                  <Connect to='/'>
                    Remember password? Sign in
                  </Connect>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}