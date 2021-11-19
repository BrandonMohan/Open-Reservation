import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import {showModal, setCurrentModal} from "../../store/modal"
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import {useHistory} from 'react-router-dom'
import { useEffect } from "react";
import { searchRestaurants} from '../../store/search'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState("")
  const searchResults = useSelector((state) => state.search)
  const results = Object.values(searchResults)


  const show = () => {
      document.querySelector(".search-results").classList.remove("hidden")
  };

  const hide = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
          document.querySelector(".search-results").classList.add("hidden")
      }
  }

  const reset = () => {
      document.querySelector(".search-results").classList.add("hidden")
      setInput("");
  }




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

  useEffect(() => {
      if (input.length > 0) {
          console.log("input term", input);
          dispatch(searchRestaurants(input))
      }
  }, [dispatch, input])

  let sessionLinks;
  if (sessionUser) {
        sessionLinks =
        (
           <div className="navContainer">

    <div className="searchBar">
            <div className="search-container"
            onBlur={(e) => hide(e)}>
              <input
                className="search-bar"
                value={input}
                placeholder="Search"
                onFocus={()=>show()}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="search-results hidden">
                  {results?.length > 0 && input.length > 0 ? (
                      Object.values(results).map((res)=> (
                          <NavLink
                          className="search-card"
                          onClick={reset}
                          to={`/restaurants/${res.id}`}>
                            <div className="search-name">{res.name}</div>
                          </NavLink>
                      ))
                  ) : (
                      <div className="search-none">No results</div>
                  )
                  }

              </div>
            </div>



      </div>
      <div className="leftNav">
             <ProfileButton className="profileBtn" user={sessionUser} />

        <button className="homeBtn" onClick={handleHome}>Home</button>
        </div>
    </div>
    )
  } else {
    sessionLinks = (
      <div className="navContainer">
      <div className="searchBar">
            <div className="search-container"
            onBlur={(e) => hide(e)}>
              <input
                className="search-bar"
                value={input}
                placeholder="Search"
                onFocus={()=>show()}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="search-results hidden">
                  {results?.length > 0 && input.length > 0 ? (
                      Object.values(results).map((res)=> (
                          <NavLink
                          className="search-card"
                          onClick={reset}
                          to={`/restaurants/${res.id}`}>
                            <div className="search-name">{res.name}</div>
                          </NavLink>
                      ))
                  ) : (
                      <div className="search-none">No results</div>
                  )
                  }

              </div>
            </div>



      </div>
      <div className="leftNav">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>SignUp</button>
        <button onClick={handleHome}>Home</button>
        </div>
      </div>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
