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

  if (sessionUser){
     dispatch(hideModal())
      return <Redirect to="/home" />;
}


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
     dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);

        }
        )
    };

    const demoUser = async (e) => {
        e.preventDefault();
        setCredential("Demo-lition");
        setPassword("password");
        const demo = dispatch(
          sessionActions.login({ credential: "Demo-lition", password: "password" })
        );
        return demo;
      };


  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li className="errorText" key={idx}>{error}</li>
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
      <button className="buttonClass" onClick={handleSubmit}>Log In</button>
      <button className="buttonClass" onClick={demoUser}>Demo User</button>
    </form>
  );
}

export default LoginFormPage;
