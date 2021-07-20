import React, { useContext,  useState } from 'react';
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
import {Link as Connect, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {SetIdContext} from '../App.js';
import {IdContext} from '../App.js';
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

export function SignIn() {
  const setId = useContext(SetIdContext);
  const id = useContext(IdContext);
  const classes = useStyles();
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    hospitalEmail: Yup.string().required().email('Please enter a valid email'),
    password: Yup.string().required('please enter your password')
  })
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm({resolver : yupResolver(validationSchema)});
  const [msg,setMsg] = useState({});
  const onSubmit = (data) => {
      signInFunction(data);
      
  }
  const signInFunction = (data)=>{
    fetch(`https://node-app-back-end-ak.herokuapp.com/hospital/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    }).then(res=>res.json())
    .then(res=>setMsg(res))
    .catch(res=>console.log(res))
  }
  
  if(msg.message==="green"){
    setId(msg._id);
    if(id){
    localStorage.setItem("t",`${msg.token}`);
    history.push('/home');
    }
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
          Sign in <br/>
          <p>{msg.message==="green"?"":msg.message}</p>
          {msg!=="green"?showMessage():''}
        </Typography>
        <form className={classes.form}  onSubmit={handleSubmit(onSubmit)} >
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
              <span style={{ color: "crimson" }}> {errors.password.message} </span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                <Connect to='/forgotpassword'>
                  Forgot password?
                </Connect>
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                <Connect to='/signup'>
                {"Don't have an account? Sign Up"}
                </Connect>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
        <p>
          For demo use test2@123.com as Email id and password
        </p>
      </Box>
    </Container>
  );
}