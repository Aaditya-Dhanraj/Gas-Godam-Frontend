import { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification(props) {
  const classes = useStyles();
  const [state, setState] = useState(false);

  useEffect(() => {
    if (props.trigger) {
      setState(true);
    }
  }, [props.trigger]);

  const handleClick = () => {
    setState(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={state}
        autoHideDuration={props.time}
        onClose={handleClose}
      >
        {props.type == "success" ? (
          <Alert onClose={handleClose} severity="success">
            {props.message}
          </Alert>
        ) : props.type == "error" ? (
          <Alert onClose={handleClose} severity="error">
            {props.message}
          </Alert>
        ) : props.type == "warning" ? (
          <Alert onClose={handleClose} severity="warning">
            {props.message}
          </Alert>
        ) : props.type == "info" ? (
          <Alert onClose={handleClose} severity="info">
            {props.message}
          </Alert>
        ) : null}
      </Snackbar>
    </div>
  );
}
