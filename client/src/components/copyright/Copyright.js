import React from "react";
import { Typography, Link } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Daniel Byun</Link> {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
