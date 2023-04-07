import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Dna } from "react-loader-spinner";
function Passwordchange() {
  const [fetchsuccess, setfsuc] = useState(true);
  const [newpass, setnpass] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("./");
  }, []);

  const handleSubmit = async (e) => {
    setfsuc(false);
    e.preventDefault();
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/update_User_Password_Forgotten_Password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("passtoken"),
          new_Password: newpass,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    alert(json.data);
    setfsuc(true);
    if (json.message == "ok") navigate("../login");
  };

  var lst = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: 200,
  };
  var st = {
    textAlign: "center",
    padding: 4,
  };
  return (
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
      <form onSubmit={handleSubmit}>
        <div style={lst}>
          <div className="wrap">
            <h2 style={st}>Enter new password</h2>
            <fieldset>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={newpass}
                  onChange={(e) => {
                    setnpass(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating ">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Password"
                />
                <label htmlFor="floatingInput">Re-enter password</label>
              </div>
              <div className="d-grid gap-2 my-4">
                <button className="btn  btn-primary">Set</button>
              </div>
            </fieldset>
          </div>
        </div>
        <div></div>
      </form>
      <Outlet />
    </>
  );
}

export default Passwordchange;
