import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  typografy: {
    marginTop: 12,
  },
}));
export function Student({ student }) {
  const classes = useStyles();

  return (
    <>
      <Avatar
        alt="Remy Sharp"
        src={student.urlImage}
        className={classes.large}
      />
      <Typography className={classes.typografy} component="h1" variant="h4">
        Bem vindo {student.name}
      </Typography>
    </>
  );
}
