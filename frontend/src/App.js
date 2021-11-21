import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { restoreCSRF } from "./store/csrf";
import Modal from "./components/Modal";
import RestaurantFeed from "./components/Restaurants/restaurants";
import SingleRestaurant from "./components/Restaurants/SingleRestaurant"
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") restoreCSRF();
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Modal />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/restaurants/:id'>
              {user ? <SingleRestaurant /> : <SplashPage />}
          </Route>
          <Route exact path='/home'>
             {user ? <RestaurantFeed /> : <SplashPage />}
          </Route>
          <Route exact path='/'>
              <SplashPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
