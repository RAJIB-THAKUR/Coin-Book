import { Outlet, Link } from "react-router-dom";
import React from "react";
import "../App.css";

function About() {
  return (
    <>
      <div className="aboupage">
        <div className="container">
          <section id="about">
            <h2>Get to Know About Us & Our Work </h2>

            <div class="about_work abdiv">
              <h2>CoinBook Brief</h2>
              <ul>
                <li>
                  CoinBook is a web based application to track our daily life
                  expenses in more disciplined and expressive manner.
                </li>
                <li>Developed using the demanding MERN Stack Technologies</li>
              </ul>
            </div>

            <div class="about_developed abdiv">
              <h2>Meet Developers Team</h2>
              <ul>
                <li>Biswajit Nag --- Frontend Developer</li>
                <li>Ramkrishna Sarkar --- Backend Developer</li>
                <li>Rajib Thakur --- Backend Developer</li>
                <li>Debjyoti Sardar --- Graphic Designer (Home Page)</li>
              </ul>
            </div>

            <div class="about_github abdiv">
              <h2>GitHub Repository Links</h2>
              <ul>
                <li>
                  <Link to="https://github.com/RAJIB-THAKUR/Coin-Book">
                    Frontend-Code
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/RAJIB-THAKUR/coinBook_Backend">
                    Backend-Code
                  </Link>
                </li>
              </ul>
            </div>

            <div class="about_contact abdiv">
              <h2>Contact Us</h2>
              <h6>Email : coinbook000@gmail.com</h6>
              <h6>Mobile : xxxxxxxx98</h6>
              <h6>Address : West Bengal, India</h6>
            </div>
          </section>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default About;
