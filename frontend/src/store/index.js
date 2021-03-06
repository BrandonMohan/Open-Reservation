import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import modal from "./modal";
import restaurants from './restaurants'
import singleRestaurant from "./singlerestaurant";
import reviews from "./reviews"
import singleReview from './singleReview'
import search from './search'
import users from './users'


const rootReducer = combineReducers({
  session: sessionReducer,
  modal,
  restaurants,
  singleRestaurant,
  reviews,
  singleReview,
  search,
  users
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
