import { SET_DARK_THEME } from "../types/uiTypes";

export const setDarkTheme = (theme) => ({
  type: SET_DARK_THEME,
  payload: theme,
});
