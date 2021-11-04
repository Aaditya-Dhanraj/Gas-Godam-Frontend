import { useEffect, useState, useContext } from "react";
import arrow from "../../../Assets/arrow.svg";
import "../home.css";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../../App";

import ModalTable from "../ModalTable/ModalTable";

import DenseTable from "../ModalTable/denseTable";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

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

const AllReport = (props) => {
  const classss = useStyles();
  const { state, dispatch } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [report, setReport] = useState("");

  function findAverage(a, b) {
    return parseFloat(a / b).toFixed(2);
  }

  const submitData = ()=>{
    fetch("https://stormy-retreat-77015.herokuapp.com/item/getByDate")
    .then((res) => res.json())
    .then((result) => {
      if (result.status === "success") {
        console.log(result.data.groupedDate);
        setData(result.data.groupedDate);
      } else if (!result.data) {
      }
    });
  }



  useEffect(() => {
    fetch("https://stormy-retreat-77015.herokuapp.com/item/getByDate")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          console.log(result.data.groupedDate);
          setData(result.data.groupedDate);
        } else if (!result.data) {
        }
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (clickDate) => {
    setLoading(true);
    fetch(`https://stormy-retreat-77015.herokuapp.com/item?dailyDate[gte]=${clickDate}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setReport(result.data.data);
          console.log(result.data.data);
          setLoading(false);
        } else if (!result.data) {
        }
      });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMobileView(true);
  };
  const [mobileView, setMobileView] = useState(true);

  return (
    <div className="allReportMain">
      <div className="heading">All Reports</div>
      <div>
        {data.map((el, key) => (
          <div
            key={key}
            onClick={() => {
              handleClickOpen(el._id.dailyDate.split("T")[0]);
            }}
            className="cardComponent"
          >
            <div className="cardComponentInner">
              <div className="date">{el._id.dailyDate.split("T")[0]}</div>
              <div className="secondCardComp">
                {/* <img src={arrow} alt="arrow" className="arrow" /> */}
                <div className="number">
                  {parseFloat(el.addRate).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          // fullScreen
          maxWidth="90%"
        >
          {!loading ? (
            <div>
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              ></DialogTitle>
              {mobileView ? (
                <div>
                  <DenseTable report={report} />
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "centre",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      setMobileView(false);
                    }}
                  >
                    Preview PDF
                  </Button>
                </div>
              ) : (
                <ModalTable report={report} />
              )}
            </div>
          ) : (
            <div
              style={{
                overflow: "hidden",
                padding: "5px",
              }}
              className={classss.root}
            >
              <CircularProgress />
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default AllReport;
