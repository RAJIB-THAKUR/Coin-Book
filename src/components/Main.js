import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Dna } from "react-loader-spinner";
function Main() {
  var textcolor = {
    color: "#dbf3c1",
  };
  let navigate = useNavigate();
  const dataFetchedRef = useRef(false);
  const [fetchsuccess, setfsuc] = useState(true);
  const [expense, setExpnses] = useState({ type: "General", val: 0, info: "" });
  var date = new Date();
  var month = date.getMonth().toString();
  var year = date.getFullYear().toString();
  var day = date.getDate().toString();
  const [expensedetail, setedetail] = useState([]);
  const [dsum, setdsum] = useState(0);
  const [ysum, setysum] = useState(0);
  const [msum, setmsum] = useState(0);
  const [ntype, setntype] = useState("General");
  const [nval, setnval] = useState(0);
  const [ninfo, setninfo] = useState("");
  const [dId, setdId] = useState("");
  const [eid, seteid] = useState("");
  const [etypespresent, setpretype] = useState([]);
  const onNewtypeChange = (e) => {
    setntype(e.target.value);
  };
  const onNewvalChange = (e) => {
    setnval(e.target.value);
  };
  const onNewinfoChange = (e) => {
    setninfo(e.target.value);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
    fetchdayData();
    fetchmoData();
    fetchyrData();
    fetchexpensetype();
  }, []);
  //fetch day sum
  async function fetchData() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Sum_Daily",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          month: month,
          year: year,
          day: day,
        }),
      }
    );
    const json = await response.json();
    if (json.length > 0) setdsum(json[0].sum);
    setfsuc(true);
  }
  //fetch monthly sum
  async function fetchmoData() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Sum_Monthly",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          month: month,
          year: year,
          day: day,
        }),
      }
    );
    const json = await response.json();
    if (json.length > 0) setmsum(json[0].sum);
    setfsuc(true);
  }
  //fetch yearly sum
  async function fetchyrData() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Sum_Yearly",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          month: month,
          year: year,
          day: day,
        }),
      }
    );
    const json = await response.json();
    if (json.length > 0) setysum(json[0].sum);
    setfsuc(true);
  }
  //fetch Expense Details
  async function fetchdayData() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Details_Daily",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          month: month,
          year: year,
          day: day,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.length > 0) {
      setedetail(json[0].details.expense);
      setdId(json[0].details._id);
    }
    setfsuc(true);
  }
  //update expense
  const updateexpense = async (e) => {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/update_Any_User_Expense_",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          date_id: dId,
          expense_id: eid,
          new_field: ntype,
          new_value: nval,
          new_info: ninfo,
        }),
      }
    );
    const json = await response.json();
    alert(json.message);
    fetchData();
    fetchmoData();
    fetchyrData();
    fetchdayData();
    setfsuc(true);
  };

  //delete particular expense
  const deleteexpense = async () => {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/delete_User_Expense",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          date_id: dId,
          expense_id: eid,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    fetchData();
    fetchmoData();
    fetchyrData();
    fetchdayData();
    setfsuc(true);
  };

  //fetch expense type
  async function fetchexpensetype() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Types",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ token: localStorage.getItem("token") }),
      }
    );
    const json = await response.json();
    if (json.message == "ok") {
      setpretype(json.data.expense_Type_List);
    }
    setfsuc(true);
  }

  //add expense
  const handleSubmit = async (e) => {
    setfsuc(false);
    const value = expense.val;
    e.preventDefault();
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/add_User_Expense_Daily",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: localStorage.getItem("token"),
          field: expense.type,
          value,
          month: month,
          year: year,
          day: day,
          info: expense.info,
        }),
      }
    );
    const json = await response.json();
    alert(json.message);
    fetchdayData();
    fetchmoData();
    fetchyrData();
    fetchData();
    setfsuc(true);
  };

  const onChange = (e) => {
    setExpnses({ ...expense, [e.target.name]: e.target.value });
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          {fetchsuccess == false && (
            <div className="loader-container">
              <Dna
                visible={true}
                height="200"
                width={window.screen.width}
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
          {window.screen.width < 500 && (
            <div className="row d-flex justify-content-evenly p-2">
              <div
                className="col-4 mobstat rounded"
                onClick={() => {
                  navigate("../year");
                }}
              >
                <p>{ysum}</p>
                <p>Year Expense</p>
              </div>
              <div
                className="col-4 mobstat rounded"
                onClick={() => {
                  navigate("../month");
                }}
              >
                <p>{msum}</p>
                <p>Month Expense</p>
              </div>
              <div className="col-4 mobstat rounded">
                <p>{dsum}</p>
                <p>Day Expense</p>
              </div>
            </div>
          )}
          <div className=" my-4 row mx-4">
            <div className="col-md-8">
              <h3 style={textcolor}>Add Your Today's Expense</h3>
              <div className="row g-2 ">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInputGrid"
                      onChange={onChange}
                      name="val"
                      value={expense.val}
                    />
                    <label for="floatingInputGrid">Expense Value</label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <select
                      class="form-select"
                      id="floatingInputGrid"
                      onChange={onChange}
                      name="type"
                      value={expense.type}
                    >
                      <option value="General">Genral</option>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Others">Others</option>
                      {(() => {
                        let rows = [];
                        if (etypespresent.length == 0) {
                          rows.push(<option>/--Add--/</option>);
                        } else {
                          for (let i = 0; i < etypespresent.length; i++) {
                            rows.push(
                              <option
                                value={etypespresent[i].expense_Type}
                                key={i}
                              >
                                {etypespresent[i].expense_Type}
                              </option>
                            );
                          }
                        }
                        return rows;
                      })()}
                    </select>
                    <label htmlFor="floatingInputGrid">Expense Type</label>
                  </div>
                </div>
              </div>
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputGrid"
                  onChange={onChange}
                  name="info"
                  value={expense.info}
                />
                <label for="floatingInputGrid">Expense Details</label>
              </div>
              <div class="d-grid col-6 mx-auto my-3">
                <button
                  class="btn btn-info"
                  type="button"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
              <h3 style={textcolor}> Today's Expense Sheet</h3>
              <div className="my-4">
                <table>
                  <tr id="rowfirst">
                    <th>Expense Type</th>
                    {window.screen.width > 500 && <th>Expense Details</th>}
                    <th>Expense Amount</th>
                  </tr>
                  {(() => {
                    let rows = [];
                    for (let i = 0; i < expensedetail.length; i++) {
                      rows.push(
                        <tr key={i}>
                          <td>
                            {expensedetail[i].type}{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                setntype(expensedetail[i].type);
                                setnval(expensedetail[i].val);
                                setninfo(expensedetail[i].info);
                                seteid(expensedetail[i]._id);
                              }}
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </td>
                          {window.screen.width > 500 && (
                            <td>{expensedetail[i].info}</td>
                          )}
                          <td>{expensedetail[i].val}</td>
                        </tr>
                      );
                    }
                    return rows;
                  })()}
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content" id="mymodal">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Edit expense
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div className="form-floating my-2">
                            <input
                              type="number"
                              className="form-control"
                              id="floatingInputGrid"
                              onChange={onNewvalChange}
                              name="nval"
                              value={nval}
                            />
                            <label htmlFor="floatingInputGrid">
                              Expense Value
                            </label>
                          </div>
                          <div className="form-floating my-2">
                            <select
                              class="form-select"
                              id="floatingInputGrid"
                              onChange={onNewtypeChange}
                              name="ntype"
                              value={ntype}
                            >
                              <option value="General">General</option>
                              <option value="Food">Food</option>
                              <option value="Travel">Travel</option>
                              <option value="Others">Others</option>
                              {(() => {
                                let rows = [];
                                if (etypespresent.length == 0) {
                                  rows.push(<option>/--Add--/</option>);
                                } else {
                                  for (
                                    let i = 0;
                                    i < etypespresent.length;
                                    i++
                                  ) {
                                    rows.push(
                                      <option
                                        value={etypespresent[i].expense_Type}
                                        key={i}
                                      >
                                        {etypespresent[i].expense_Type}
                                      </option>
                                    );
                                  }
                                }
                                return rows;
                              })()}
                            </select>
                            <label htmlFor="floatingInputGrid">
                              Expense Type
                            </label>
                          </div>
                          <div className="form-floating my-2">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInputGrid"
                              onChange={onNewinfoChange}
                              name="ninfo"
                              value={ninfo}
                            />
                            <label htmlFor="floatingInputGrid">
                              Expense Details
                            </label>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              const conf = window.confirm(
                                "Your expense will be deleted permanently."
                              );
                              console.log(conf);
                              if (
                                1 ||
                                window.confirm(
                                  "Your expense will be deleted permanently."
                                )
                              ) {
                                deleteexpense();
                              }
                            }}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={updateexpense}
                            data-bs-dismiss="modal"
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <tr id="rowlast">
                    <th>Total Expense</th>
                    {window.screen.width > 500 && <th></th>}
                    <th>{dsum}</th>
                  </tr>
                </table>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 ">
              {window.screen.width > 500 && (
                <div className="mainf expensestat rounded">
                  <Link to="/year">
                    <div className="circstat row g-3">
                      <div className="col circstatcenter numstats">
                        <h5>Rs. {ysum}</h5>
                      </div>
                      <p className="col dividervt"></p>
                      <div className="col circstatcenter">
                        <h4>Expense of Year</h4>
                      </div>
                    </div>
                  </Link>
                  <p className=" dividerhz"></p>
                  <Link to="/month">
                    <div className="circstat row g-3">
                      <div className="col circstatcenter numstats">
                        <h5>Rs. {msum}</h5>
                      </div>
                      <p className="col dividervt"></p>
                      <div className="col circstatcenter">
                        <h4>Expense of Month</h4>
                      </div>
                    </div>
                  </Link>
                  <p className=" dividerhz"></p>
                  <div className="circstat row g-3">
                    <div className="col circstatcenter numstats">
                      <h5>Rs. {dsum}</h5>
                    </div>
                    <p className="col dividervt"></p>
                    <div className="col circstatcenter">
                      <h4>Expense of Day</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        navigate("../")
      )}
      <Outlet />
    </>
  );
}

export default Main;
