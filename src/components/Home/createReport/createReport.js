import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";

import "../home.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  inputRoot: {
    fontWeight: 700,
  },
}));
const nowDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

const CreateReport = () => {
  const classes = useStyles();
  const [selectedDate, setselectedDate] = useState(new Date());
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);
  const [noti, setNoti] = useState(false);
  const history = useHistory();

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData);
  };
  const sendDataLogin = () => {
    fetch("https://stormy-retreat-77015.herokuapp.com/item", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.user);
        if (data.status === "success") {
          setNoti(true);
          setTimeout(() => {
            history.push("/createReport");
          }, 2500);
        } else if (data.status === "Fail") {
          if (data.error) {
            // M.toast({
            //   html: data.message,
            //   classes: "#c62828 red darken-1",
            // });
          }
        } else {
          // M.toast({
          //   html: "Please check your network connection",
          //   classes: "#c62828 red darken-1",
          // });
        }
      });
  };

  return (
    <div>
      <div className="heading">Create Report</div>
      <div className="center">
        <input
          type="date"
          data-date-format="yyyy-mm-dd"
          defaultValue={nowDate}
          onChange={(e) => {
            setselectedDate(e.target.value);
            console.log(e.target.value);
          }}
          style={{
            borderRadius: "8px",
            width: "200px",
            height: "40px",
            fontSize: "1.5em",
            marginTop: "20px",
            border: "2px solid black",
            background: "whitesmoke",
          }}
        />
        <br />
      </div>
      <div className="form">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            className="textarea"
            InputLabelProps={classes.inputRoot}
            InputProps={classes.props}
            name="Name"
            label="NAME"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="INITIAL FULL"
            label="INITIAL FULL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="IMPORT FULL"
            label="IMPORT FULL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="INITIAL TOTAL"
            label="INITIAL TOTAL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="EXPORT FULL"
            label="EXPORT FULL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="Total"
            label="TOTAL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="REFILL"
            label="REFILL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="SBC"
            label="SBC"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="DBC"
            label="DBC"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="FINAL FULL"
            label="FINAL FULL"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="INITIAL EMPTY"
            label="INITIAL EMPTY"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="TOTAL EMPTY"
            label="TOTAL EMPTY"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="IMPORT EMPTY"
            label="IMPORT EMPTY"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="EXPORT EMPTY"
            label="EXPORT EMPTY"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="FINAL EMPTY"
            label="FINAL EMPTY"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="TOTAL AMOUNT"
            label="TOTAL AMOUNT"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="ONLINE PAYMENT"
            label="ONLINE PAYMENT"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="EXPENSE"
            label="EXPENSE"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="TOTAL MONEY"
            label="TOTAL MONEY"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="SBC"
            label="SBC"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="DBC"
            label="DBC"
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className="textarea"
            name="ToDBC"
            label="ToDBC"
            onChange={handleInputChange}
            variant="outlined"
          />
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: "auto", marginLeft: "15px" }}
            checked={checked}
            onChange={handleCheck}
            color="primary"
          />
          {checked ? (
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                className="textarea"
                name="Discription"
                label="Discription"
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                className="textarea"
                name="Expense Discription"
                label="Expense Discription"
                onChange={handleInputChange}
                variant="outlined"
              />
            </form>
          ) : null}
          <button className="btn">ADD DATA</button>
        </div>
      </div>
    </div>
  );
};
export default CreateReport;
