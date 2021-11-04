import "./ModalTable.css";

import Button from "@material-ui/core/Button";

import Pdf from "react-to-pdf";

import { createRef, useEffect } from "react";

const ref = createRef();

const options = {
  orientation: "landscape",
  pages: 2,
};

const ModalTable = ({ report }) => {
  useEffect(() => {
    console.log(report, "report from child");
  });
  var showPdf = false;
  return (
    <div>
      <table ref={ref} options={options}>
        <caption>Date :- {report[0].dailyDate.split("T")[0]}</caption>
        <caption style={{ textAlign: "end", marginRight: "20px" }}>
          Rate:- {report[0].rate}
        </caption>
        <thead>
          <tr style={{ wordBreak: "break-word" }}>
            <th scope="col"></th>
            <th scope="col">Initial (F)</th>
            <th scope="col">Import (F)</th>
            <th scope="col">Initial Total</th>
            <th scope="col">Export (F)</th>
            <th scope="col">Total</th>
            <th scope="col">Refill</th>
            <th scope="col">SBC</th>
            <th scope="col">DBC</th>
            <th scope="col">Final (F)</th>
            <th scope="col">Initial (E)</th>
            <th scope="col">Total (E)</th>
            <th scope="col">Import (E)</th>
            <th scope="col">Export (E)</th>
            <th scope="col">Final (E)</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Online Payment</th>
            <th scope="col">Expense</th>
            <th scope="col">Total Money</th>
            <th scope="col">SBC</th>
            <th scope="col">DBC</th>
            <th scope="col">ToDBC</th>
          </tr>
        </thead>
        <tbody>
          {report.map((el, key) => (
            <tr style={{ wordBreak: "break-word" }}>
              <td
                style={{ fontWeight: "bolder" }}
                scope="row"
                data-label="Showroom"
              >
                {el.showRoomName}
              </td>
              <td data-label="Initial (F)">{el.filledQuantityInitial}</td>
              <td data-label="Import (F)">{el.filledIn}</td>
              <td data-label="Initial Total">{el.initialTotal}</td>
              <td data-label="Export (F)">{el.filledOut}</td>
              <td data-label="Total">{el.total}</td>
              <td data-label="Refill">{el.purchasedTypeRefill}</td>
              <td data-label="SBC">{el.purchasedTypeSBC}</td>
              <td data-label="DBC">{el.purchasedTypeDBC}</td>
              <td data-label="Final (F)">{el.filledQuantityFinal}</td>
              <td data-label="Initial (E)">{el.emptyQuantityInitial}</td>
              <td data-label="Total (E)">{el.totalEmpty}</td>
              <td data-label="Import (E)">{el.emptyIn}</td>
              <td data-label="Export (E)">{el.exportEmpty}</td>
              <td data-label="Final (E)">{el.emptyQuantityFinal}</td>
              <td data-label="Total Amount">{el.totalPayment}</td>
              <td data-label="Online Payment">{el.moneyTypeOnline}</td>
              <td data-label="Expense">{el.expense}</td>
              <td data-label="Total Money">{el.totalMoney}</td>
              <td data-label="SBC">{el.SVSBC}</td>
              <td data-label="DBC">{el.SVDBC}</td>
              <td data-label="ToDBC">{el.SVToDBC}</td>
            </tr>
          ))}
          {report.map((el, key) => (
            <div>
              {el.dailyDiscription !== "N/A" ||
              el.expenseDescription !== "N/A" ? (
                <div style={{ marginTop: "10px" }}>
                  {el.dailyDiscription !== "N/A" ? (
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                        padding: "5px",
                        minWidth: "26cm",
                        fontSize: "0.8em",
                      }}
                    >
                      <div>Discription :-</div>
                      <div>{report[key].dailyDiscription}</div>
                    </div>
                  ) : null}
                  {el.expenseDescription !== "N/A" ? (
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                        padding: "5px",
                        minWidth: "26cm",
                        fontSize: "0.8em",
                      }}
                    >
                      <div>Expense Discription :-</div>
                      <div>{report[key].expenseDescription}</div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
          <div
            style={{
              fontSize: "0.7em",
              textAlign: "end",
              minWidth: "27cm",
              marginTop: "50px",
              marginBottom: "5px",
            }}
          >
            Signature
          </div>
        </tbody>
      </table>
      <Pdf
        targetRef={ref}
        filename={`${report[0].dailyDate.split("T")[0]} Report.pdf`}
        scale={1}
        options={options}
        x={6}
        y={6}
      >
        {({ toPdf }) => (
          <Button
            color="primary"
            style={{
              display: "flex",
              justifyContent: "centre",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={toPdf}
          >
            Generate Pdf
          </Button>
        )}
      </Pdf>
    </div>
  );
};

export default ModalTable;
