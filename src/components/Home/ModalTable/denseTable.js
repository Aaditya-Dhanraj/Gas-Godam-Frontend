import "./ModalTable.css";

import { useEffect, useState } from "react";

const DenseTable = ({ report }) => {
  useEffect(() => {
    console.log(report, "report from child");
  }, [1]);

  return (
    <div>
      <table className="Mobtable">
        <caption className="Mobtablecaption">
          Date :- {report[0].dailyDate.split("T")[0]}
        </caption>
        <thead className="Mobtablethead">
          <tr className="Mobtabletr" style={{ wordBreak: "break-word" }}>
            <th scope="col">Name</th>
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
            <tr className="Mobtabletr" style={{ wordBreak: "break-word" }}>
              <td
                className="Mobtabletd"
                style={{ fontWeight: "bolder" }}
                scope="row"
                data-label="Showroom"
              >
                {el.showRoomName}
              </td>
              <td className="Mobtabletd" data-label="Initial (F)">
                {el.filledQuantityInitial}
              </td>
              <td className="Mobtabletd" data-label="Import (F)">
                {el.filledIn}
              </td>
              <td className="Mobtabletd" data-label="Initial Total">
                {el.initialTotal}
              </td>
              <td className="Mobtabletd" data-label="Export (F)">
                {el.filledOut}
              </td>
              <td className="Mobtabletd" data-label="Total">
                {el.total}
              </td>
              <td className="Mobtabletd" data-label="Refill">
                {el.purchasedTypeRefill}
              </td>
              <td className="Mobtabletd" data-label="SBC">
                {el.purchasedTypeSBC}
              </td>
              <td className="Mobtabletd" data-label="DBC">
                {el.purchasedTypeDBC}
              </td>
              <td className="Mobtabletd" data-label="Final (F)">
                {el.filledQuantityFinal}
              </td>
              <td className="Mobtabletd" data-label="Initial (E)">
                {el.emptyQuantityInitial}
              </td>
              <td className="Mobtabletd" data-label="Total (E)">
                {el.totalEmpty}
              </td>
              <td className="Mobtabletd" data-label="Import (E)">
                {el.emptyIn}
              </td>
              <td className="Mobtabletd" data-label="Export (E)">
                {el.exportEmpty}
              </td>
              <td className="Mobtabletd" data-label="Final (E)">
                {el.emptyQuantityFinal}
              </td>
              <td className="Mobtabletd" data-label="Total Amount">
                {el.totalPayment}
              </td>
              <td className="Mobtabletd" data-label="Online Payment">
                {el.moneyTypeOnline}
              </td>
              <td className="Mobtabletd" data-label="Expense">
                {el.expense}
              </td>
              <td className="Mobtabletd" data-label="Total Money">
                {el.totalMoney}
              </td>
              <td className="Mobtabletd" data-label="SVC">
                {el.SVSBC}
              </td>
              <td className="Mobtabletd" data-label="DBC">
                {el.SVDBC}
              </td>
              <td className="Mobtabletd" data-label="ToDBC">
                {el.SVToDBC}
              </td>
            </tr>
          ))}
          <div>
            {report.map((el, key) => (
              <div>
                {}
                {el.dailyDiscription !== "N/A" ||
                el.expenseDescription !== "N/A" ? (
                  <div style={{ maxWidth: "100%", padding: "10px" }}>
                    {el.dailyDiscription !== "N/A" ? (
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "10px",
                          padding: "5px",
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          style={{
                            minWidth: "fit-content",
                            marginRight: "15px",
                            marginTop: "10px",
                            fontSize: "0.8em",
                            fontWeight: "bolder",
                          }}
                        >
                          Discription-:-
                        </div>
                        <div
                          style={{
                            minWidth: "100px",
                            wordBreak: "break-word",
                            border: "2px solid black",
                            borderRadius: "10px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {report[key].dailyDiscription}
                        </div>
                      </div>
                    ) : null}
                    {el.expenseDescription !== "N/A" ? (
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "10px",
                          padding: "5px",
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          style={{
                            minWidth: "min-content",
                            marginRight: "15px",
                            marginTop: "10px",
                            fontSize: "0.8em",
                            fontWeight: "bolder",
                          }}
                        >
                          Expense Discription-:-
                        </div>
                        <div
                          style={{
                            minWidth: "100px",
                            wordBreak: "break-word",
                            border: "2px solid black",
                            borderRadius: "10px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                        >
                          {report[key].expenseDescription}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default DenseTable;
