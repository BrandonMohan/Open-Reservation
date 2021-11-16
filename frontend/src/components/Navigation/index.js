import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import {showModal, setCurrentModal} from "../../store/modal"
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import {useHistory} from 'react-router-dom'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = (e) => {
    // e.preventDefault();
    dispatch(setCurrentModal(LoginFormPage));
    dispatch(showModal());
};

  const handleSignup = (e) => {
      dispatch(setCurrentModal(SignupFormPage));
      dispatch(showModal());
  }

  const handleHome = (e) => {
      history.push('/')
  }


  let sessionLinks;
  if (sessionUser) {
        sessionLinks =
        (
           <>
             <ProfileButton user={sessionUser} />

        <button onClick={handleHome}>Home</button>
    </>
    )
  } else {
    sessionLinks = (
      <>
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>SignUp</button>
        <button onClick={handleHome}>Home</button>
      </>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
