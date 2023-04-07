import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dna } from "react-loader-spinner";
function Sign() {
  const [credentials, setCredentials] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [fetchsuccess, setfsuc] = useState(true);
  const handleSubmit = async (e) => {
    setfsuc(false);
    e.preventDefault();
    const { name, email, mobile, password } = credentials;
    console.log(credentials);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/register",
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },

        body: JSON.stringify({ name, email, mobile, password }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.res_Status) {
      // Save the auth token and redirect
      //localStorage.setItem('token', json.authtoken);
      navigate("../login");
      alert(json.message);
    } else {
      alert(json.error);
    }
    setfsuc(true);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  var lst = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: 120,
  };
  var nst = {
    width: 400,
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
          <div className="wrap" style={nst}>
            <h2 style={st}>Sign Up</h2>
            <fieldset>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="floatingInput"
                  name="name"
                  placeholder="name"
                  value={credentials.name}
                  onChange={onChange}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="floatingInput"
                  name="mobile"
                  placeholder="mobile"
                  value={credentials.mobile}
                  onChange={onChange}
                />
                <label htmlFor="floatingInput">Mobile</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-grid gap-2 my-4">
                <button className="btn  btn-primary">Submit</button>
              </div>
              <div className="d-grid gap-2 my-4">
                <Link to="../login">
                  <button className="btn  btn-dark">Log In</button>
                </Link>
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

export default Sign;
