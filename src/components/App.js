import { Outlet, Link, useNavigate } from "react-router-dom";
import React from "react";
import "../App.css";

function App() {
  let navigate = useNavigate();
  function logout(e) {
    localStorage.clear();
    navigate("./");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top" id="navs">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Coinbook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") && (
                <li className="nav-item ">
                  <p
                    className="nav-Link active mynav"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                    onClick={() => {
                      navigate("/main");
                    }}
                  >
                    Home
                  </p>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <p
                    className="nav-Link active mynav"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                    onClick={() => {
                      navigate("/history");
                    }}
                  >
                    History
                  </p>
                </li>
              )}
              <li className="nav-item">
                <p
                  className="nav-Link mynav"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  About
                </p>
              </li>

              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <p
                    className="nav-Link active mynav"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                    onClick={() => {
                      localStorage.clear();
                      navigate("../");
                    }}
                  >
                    Log Out
                  </p>
                </li>
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <p
                className="nav-Link"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <button className="btn btn-dark mx-2">Log In</button>
              </p>
            ) : (
              <p
                id="prficon"
                onClick={() => {
                  navigate("/profile");
                }}
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </p>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
