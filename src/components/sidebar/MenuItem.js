// import * as React from "react";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Notification from "../Home/Notification/Notification";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    display: "",
  },
  closed: {
    y: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000 },
    },
    display: "none",
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, imgs, names, links }) => {

  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const style = { border: `2px solid ${colors[i]}` };
  function clickResponse(i) {
    // console.log(i);
    if (i === 2) {
      fetch("/api/v1/users/logout", {
        method: "get",
      }).then((result) => {
        console.log(result);
        localStorage.clear();
        dispatch({ type: "CLEAR" });
        history.push("/login");
      });
    }
  }

  return (
    <div>
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="icon-placeholder" style={style}>
          <img
            src={imgs}
            style={{
              height: "70%",
              width: "70%",
              marginTop: "15%",
              marginLeft: "15%",
            }}
            alt={imgs}
          />
        </div>
        <Link
          onClick={() => {
            clickResponse(i);
          }}
          to={`/${links}`}
          className="text-placeholder"
          style={{
            border: `2px solid ${colors[i]}`,
            display: "flex",
            height: "fit-content",
            alignItems: "center",
            justifyContent: "center",
            height: "max-content",
          }}
        >
          {names}
        </Link>
      </motion.li>
    </div>
  );
};
