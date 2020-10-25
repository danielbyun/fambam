import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { LOGOUT_USER_SUCCESS } from "../types/authTypes";
import auth from "./authReducer";
import ui from "./uiReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ui"],
};

const appReducer = combineReducers({
  auth,
  ui,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
