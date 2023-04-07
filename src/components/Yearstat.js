import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { Dna } from "react-loader-spinner";

function Yearstat() {
  let navigate = useNavigate();
  var date = new Date();
  const [fetchsuccess, setfsuc] = useState(true);
  var month = date.getMonth().toString();
  var year = date.getFullYear().toString();
  var day = date.getDate().toString();
  const [yrdetail, setyrdetail] = useState([]);
  var types = [];
  var typesums = [];
  var colortypes = [
    "red",
    "blue",
    "yellow",
    "brown",
    "violet",
    "blueviolet",
    "royalblue",
    "gold",
  ];
  const [typesst, settype] = useState([]);
  const [typesumst, settypesum] = useState([]);
  useEffect(() => {
    fetchyerData();
    typewiseyrdata();
  }, []);

  //year data of epense monthsum
  async function fetchyerData() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Details_Yearly",
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
    let j = 0;
    let exar = [];
    for (let i = 0; i < 12; i++) {
      if (j < json.length && i == parseInt(json[j]._id)) {
        exar[i] = json[j].sum;
        j++;
      } else {
        exar[i] = 0;
      }
    }
    setyrdetail(exar);
    setfsuc(true);
  }

  //typewise details fetch
  async function typewiseyrdata() {
    setfsuc(false);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_TypeWise_Yearly",
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
    for (let i = 0; i < json.length; i++) {
      if (json[i].sum > 0) {
        types[i] = json[i]._id;
        typesums[i] = json[i].sum;
      }
    }
    settype(types);
    settypesum(typesums);
    setfsuc(true);
  }
  //------------------------------------------------------
  let val = true,
    rad = 6;

  if (window.screen.width < 450) {
    val = false;
    rad = 3.2;
  }
  const options2 = {
    maintainAspectRatio: val,
    plugins: {
      indexAxis: "y",
      legend: {
        //display:false
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          //display:false
          color: (c) => {
            return "rgba(13, 245, 233, 0.8)";
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          // display:false
          color: (c) => {
            return "rgba(13, 245, 233, 0.8)";
          },
        },
      },
    },
  };

  //-------------------------------------------------------

  const progressBar = {
    id: "progressBar",
    beforeDatasetsDraw(chart, pluginOptions) {
      const {
        ctx,
        chartArea: { bottom, height, left, right, top, width },
        scales: { x, y },
      } = chart;
      const barwidth =
        (width / x.ticks.length) *
        data.datasets[0].barPercentage *
        data.datasets[0].categoryPercentage;
      // console.log("height : ");
      // console.log(height);
      for (let i = 0; i < 31; i++) {
        ctx.save();
        ctx.fillStyle = "rgba(192, 204, 250, 0.2)";
        //ctx.fillRect(10,10,1000,100);
        ctx.beginPath();
        //ctx.fillRect(x.getPixelForValue(i)-(barwidth/2),top+5,barwidth,height-20);

        ctx.arc(x.getPixelForValue(i), top + rad, rad, Math.PI, 2 * Math.PI); //  chilo val-> (barwidth/2)
        ctx.arc(x.getPixelForValue(i), top + height - rad, rad, 0, Math.PI);
        ctx.fill();
      }
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expense vs month",
        backgroundColor: "rgba(57, 99, 252, 1)",
        borderColor: "rgb(155, 199, 132)",
        data: yrdetail,
        borderWidth: 0,
        borderSkipped: false,
        borderRadius: 5,
        barPercentage: 0.3,
        categoryPercentage: 0.8,
      },
    ],
  };
  console.log(typesst);
  console.log(typesumst);
  const datatypewise = {
    labels: typesst,
    datasets: [
      {
        label: "Typewise expenses",

        borderColor: "rgb(155, 199, 132)",
        data: typesumst,
        backgroundColor: [
          "rgba(255, 26, 104, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(7, 236, 91, 1)",
        ],
        borderWidth: 0,
        cutout: "80%",
        radius: "70%",
        //animateRotate:true,
        //borderSkipped:false,
        borderRadius: 9,
        offset: 5,
        barPercentage: 0.2,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options1 = {
    maintainAspectRatio: false,
    plugins: {
      indexAxis: "y",
      legend: {
        //display:false,

        position: "left",
        labels: {
          color: "rgba(13, 245, 233, 0.8)",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
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
          <div className="row mx-3 my-3">
            <div className=" col col-md-6 col-lg-6 col-sm-12 mycalback rounded">
              <h3>Your yearly expense stat</h3>
              <div className="row">
                {(() => {
                  let rows = [];
                  for (let i = 0; i < yrdetail.length; i++) {
                    rows.push(
                      <div className="col-md-4" key={i}>
                        <div
                          className="mycal rounded"
                          onClick={() => {
                            localStorage.setItem("mon", i);
                            navigate("../month");
                          }}
                        >
                          <h5>{labels[i]}</h5>
                          <h4>{yrdetail[i]}</h4>
                        </div>
                      </div>
                    );
                  }
                  return rows;
                })()}
              </div>
            </div>
            <div className=" col col-md-6 col-lg-6 col-sm-12 yrstatspmar">
              <div className="chartstat shadow-lg p-2 rounded">
                <Bar data={data} options={options2} plugins={[progressBar]} />
              </div>

              <div className="chartstat shadow-lg p-2  rounded">
                <p>Typewise expenses</p>
                <div className="chartsp">
                  <Doughnut data={datatypewise} options={options1} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>sorry you have to login first</div>
      )}
      <Outlet />
    </>
  );
}

export default Yearstat;
