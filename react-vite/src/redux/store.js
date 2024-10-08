import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import itemReducer from "./item";
import cartReducer from "./cart";
import reviewsReducer from "./review";
import exhibitionReducer from "./exhibition";
import membershipReducer from "./membership";
import memberReducer from "./member";
import ordersReducer from "./order";
import admissionReducer from "./admission";
import purchaseReducer from "./purchase";
const rootReducer = combineReducers({
  session: sessionReducer,
  member: memberReducer,
  memberships:membershipReducer,
  cart: cartReducer,
  orders: ordersReducer,
  items: itemReducer,
  reviews:reviewsReducer,
  exhibitions: exhibitionReducer,
  admissions: admissionReducer,
  purchases: purchaseReducer
  

});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
