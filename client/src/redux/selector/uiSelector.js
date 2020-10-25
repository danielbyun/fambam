import { createSelector } from "reselect";

const selectUiTheme = (state) => state.ui;

export const selectDarkTheme = createSelector(
  [selectUiTheme],
  (theme) => theme.darkTheme
);
