// store
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

// middlewares
import thunk from "redux-thunk";
// import logger from "redux-logger";
// import notificationMiddleware from "./middlewares/notifications/notificationMiddleware";

// root reducer
import rootReducer from "./reducer/index";

// initial state of the application
const initialState = {};

// middleware
// export const middlewares = [thunk, notificationMiddleware];
export const middlewares = [thunk];

// store
export let store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (
  window.navigator.userAgent.includes("Chrome") &&
  ReactReduxDevTools &&
  process.env.NODE_ENV === "development"
) {
  const devMiddlewares = [...middlewares];
  // in chrome browser, react redux devtools and in development mode
  store = createStore(
    rootReducer,
    initialState,
    // this way if we add more middlewares in the above array, it'll automatically update
    compose(applyMiddleware(...devMiddlewares), ReactReduxDevTools)
  );
} else {
  // in other browsers other than chrome
  store = createStore(
    rootReducer,
    initialState,
    // this way if we add more middlewares in the above array, it'll automatically update
    compose(applyMiddleware(...middlewares))
  );
}

// export const store = createStore(
//   rootReducer,
//   initialState,
//   // this way if we add more middlewares in the above array, it'll automatically update
//   compose(applyMiddleware(...middleware), ReactReduxDevTools)
// );

export const persistor = persistStore(store);
// export default store;
export default { store, persistStore };
