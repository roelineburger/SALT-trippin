import React, { useState } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import auth from '../firebase-config';
import Logo from '../assets/trippin1.svg';
import userIcon from '../assets/user.svg';

function Nav() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      setLoggedIn(true);
      console.log(registeredUser);
    } catch (error) {
      console.log(error.message);
      alert('test');
    }
  };

  const login = async () => {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      setLoggedIn(true);
      console.log(loggedUser);
    } catch (error) {
      console.log(error.message);
      alert('test');
    }
  };

  const logout = async () => {
    await signOut(auth);
    setLoggedIn(false);
  };

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  console.log(user);
  return (
    <>
      <nav className="nav-container">
        <img src={Logo} alt="logo" className="nav-container__logo" />
        <ul className="nav-container__list">
          <li className="nav-container__item">
            <Link className="nav-container__link" to="/">Home</Link>
          </li>
          <li className="nav-container__item">
            <Link className="nav-container__link" to="/about">About</Link>
          </li>
          {!loggedIn
            ? (
              <>
                <li className="nav-container__item">
                  <button className="nav-container__item--button" onClick={handleOpenSignIn}>Sign in</button>
                </li>
                <li className="nav-container__item">
                  <button className="nav-container__item--button" onClick={handleOpenSignUp}>Sign up</button>
                </li>
              </>
            )
            : (
              <>
                <li className="nav-container__item">
                  <button className="nav-container__item--button" onClick={logout}>Sign Out</button>
                </li>
                <li className="nav-container__item">
                  <img src={userIcon} alt="user icon" className="nav-container__userIcon" />
                </li>
              </>
            )}
        </ul>
      </nav>
      <Dialog open={openSignIn}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignIn}>Cancel</Button>
          <Button onClick={() => {
            handleCloseSignIn();
            login();
          }}
          >
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSignUp}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignUp}>Cancel</Button>
          <Button onClick={() => {
            handleCloseSignUp();
            register();
          }}
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Nav;
