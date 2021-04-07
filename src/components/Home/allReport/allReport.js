import { useEffect, useState } from "react";
import arrow from "../../../Assets/arrow.svg";
import "../home.css";

const AllReport = (props) => {
  const data = [
    1,
    
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ];

  return (
    <div className="allReportMain" >
      <div className="heading"></div>
      {data.map((el, key) => (
        <div className="cardComponent">
          <div className="cardComponentInner">
            <div className="date">27-04-2021</div>
            <div className="secondCardComp">
              <img src={arrow} alt="arrow" className="arrow" />
              <div className="number">50</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReport;
