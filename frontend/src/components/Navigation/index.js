import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { showModal, setCurrentModal } from "../../store/modal";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { searchRestaurants } from "../../store/search";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");
  const searchResults = useSelector((state) => state.search);
  const results = Object.values(searchResults);

  const show = () => {
    document.querySelector(".results").classList.remove("hidden");
  };

  const hide = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      document.querySelector(".results").classList.add("hidden");
    }
  };

  const reset = () => {
    document.querySelector(".results").classList.add("hidden");
    document.querySelector(".searchCard").classList.add("hidden");
    setInput("");
  };


  const handleLogin = (e) => {
    // e.preventDefault();
    dispatch(setCurrentModal(LoginFormPage));
    dispatch(showModal());
  };

  const handleSignup = (e) => {
    dispatch(setCurrentModal(SignupFormPage));
    dispatch(showModal());
  };

  const handleHome = (e) => {
    history.push("/home");
  };

  useEffect(() => {
    if (input.length > 0) {
      console.log("input term", input);
      dispatch(searchRestaurants(input));
    }
  }, [dispatch, input]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="navContainer">
        <div className="searchDiv">
          <div className="searchContainer" onBlur={(e) => hide(e)}>
            <input
              className="searchBar"
              value={input}
              placeholder="Search"
              onFocus={() => show()}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="results hidden">
              {results?.length > 0 && input.length > 0 ? (
                Object.values(results).map((res) => (
                    <div className="searchCard">
                  <NavLink
                    onClick={reset}
                    to={`/restaurants/${res.id}`}
                  >
                    <div className="searchName">{res.name}</div>
                  </NavLink>
                  </div>
                ))
              ) : (
                <div className="noResults">No results found</div>
              )}
            </div>
          </div>
        </div>
        <div className="leftNav">
          <button className="homeBtn" onClick={handleHome}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="1em"
              width="1em"
              style={{ transform: "rotate(360deg)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>

          <ProfileButton className="profileBtn" user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="navContainer">
        {/* <div className="searchBar">
          <div className="search-container" onBlur={(e) => hide(e)}>
            <input
              className="search-bar"
              value={input}
              placeholder="Search"
              onFocus={() => show()}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="search-results hidden">
              {results?.length > 0 && input.length > 0 ? (
                Object.values(results).map((res) => (
                  <NavLink
                    className="search-card"
                    onClick={reset}
                    to={`/restaurants/${res.id}`}
                  >
                    <div className="search-name">{res.name}</div>
                  </NavLink>
                ))
              ) : (
                <div className="search-none">No results</div>
              )}
            </div>
          </div>
        </div> */}
        <div className="leftNav">
          <button className="buttonClass" onClick={handleLogin}>
            Login
          </button>
          <button className="buttonClass" onClick={handleSignup}>
            SignUp
          </button>
        </div>
      </div>
    );
  }

  return <div>{isLoaded && sessionLinks}</div>;
}

export default Navigation;
