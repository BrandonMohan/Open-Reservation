import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {hideModal} from "../../store/modal"
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/home')
    dispatch(hideModal())
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = async () => {
      history.push('/home')
      dispatch(hideModal())
    return dispatch(sessionActions.login({credential: "Demo-lition", password: 'password'}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button onClick={handleSubmit}>Log In</button>
      <button onClick={demoUser}>Demo User</button>
    </form>
  );
}

export default LoginFormPage;


