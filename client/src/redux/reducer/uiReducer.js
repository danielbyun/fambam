import { SET_DARK_THEME } from "../types/uiTypes";

const initialState = {
  darkMode: false,
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_DARK_THEME:
      return {
        ...state,
        darkTheme: payload,
      };
    default:
      return state;
  }
};
