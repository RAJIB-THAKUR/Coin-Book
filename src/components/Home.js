import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import homeim from "../back.png";
import fpvid from "../fpvideo.mp4";
import fetearevid from "../Coin Book.mp4";
import fpvidph from "../fpvideoph.mp4";
import fetearevidph from "../Coin Bookph.mp4";
function Home() {
  return (
    <>
      {window.screen.width > 500 ? (
        <>
          <div className="d-flex justify-content-center ">
            <video className="fpvid" autoPlay muted>
              <source src={fpvid} />
            </video>
          </div>
          <div className="d-flex justify-content-center">
            <video className="fpvid" autoPlay muted loop>
              <source src={fetearevid} />
            </video>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center ">
            <video className="fpvid" autoPlay muted>
              <source src={fpvidph} />
            </video>
          </div>
          <div className="d-flex justify-content-center">
            <video className="fpvid" autoPlay muted loop>
              <source src={fetearevidph} />
            </video>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}

export default Home;
