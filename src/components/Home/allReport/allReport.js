import { useEffect, useState, useContext } from "react";
import arrow from "../../../Assets/arrow.svg";
import "../home.css";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../../App";

import DenseTable from "../ModalTable/ModalTable";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AllReport = (props) => {
  const { state, dispatch } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [godownTransfer, setGodownTransfer] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/item/getByDate")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          console.log(result.data.groupedDate);
          setData(result.data.groupedDate);
          setGodownTransfer(result.data.groupedDate[0].allMovedCylinder);
        } else if (!result.data) {
        }
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (clickDate) => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/item?dailyDate=${clickDate}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setLoading(false);
          setGodownTransfer(result.data);
          console.log(result.data);
        } else if (!result.data) {
        }
      });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  var tzoffset = new Date().getTimezoneOffset() * 60000;

  return (
    <div className="allReportMain">
      <div className="heading"></div>
      {console.log(new Date(Date.now() - tzoffset).toISOString().split("T")[0])}
      <div>
        {data.map((el, key) => (
          <div
            onClick={() => {
              handleClickOpen(el._id.dailyDate.split("T")[0]);
            }}
            className="cardComponent"
          >
            <div className="cardComponentInner">
              <div className="date">{el._id.dailyDate.split("T")[0]}</div>
              <div className="secondCardComp">
                <img src={arrow} alt="arrow" className="arrow" />
                <div className="number">{el.allMovedCylinder}</div>
              </div>
            </div>
          </div>
        ))}
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          {!loading ? (
            <div>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Report on 09-04-2021
              </DialogTitle>
              <DenseTable />
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    handleClose();
                  }}
                  color="primary"
                >
                  EXPORT PDF
                </Button>
              </DialogActions>
            </div>
          ) : null}
        </Dialog>
      </div>
    </div>
  );
};

export default AllReport;

{
  /* <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent> */
}
