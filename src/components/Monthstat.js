import "../App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Dna } from "react-loader-spinner";
function Monthstat() {
  let navigate = useNavigate();
  const [fetchsuccess, setfsuc] = useState(true);
  const dataFetchedRef = useRef(false);
  const mon = localStorage.getItem("mon");
  console.log(mon);
  var date = new Date();
  const [totalday, settotalday] = useState(
    daysInMonth(
      !mon ? date.getMonth() + 1 : parseInt(mon) + 1,
      date.getFullYear()
    )
  );
  var month = !mon ? date.getMonth().toString() : mon.toString();
  var year = date.getFullYear().toString();
  var day = date.getDate().toString();
  const [modetail, setmodetail] = useState([]);
  const [selmon, setmon] = useState();
  var monthname = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchmoData();
    if (localStorage.getItem("mon")) {
      localStorage.removeItem("mon");
    }
  }, []);

  async function fetchmoData() {
    setfsuc(false);
    setmon(month);
    console.log(selmon);
    const response = await fetch(
      "https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Details_Monthly",
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
    function GetSortOrder(prop) {
      return function (a, b) {
        if (parseInt(a[prop]) > parseInt(b[prop])) {
          return 1;
        } else if (parseInt(a[prop]) < parseInt(b[prop])) {
          return -1;
        }
        return 0;
      };
    }
    json.sort(GetSortOrder("_id"));
    console.log(json);
    let exar = [];
    for (let i = 0; i < totalday; i++) {
      if (j < json.length && i == parseInt(json[j]._id) - 1) {
        exar[i] = json[j].sum;
        j++;
      } else {
        exar[i] = 0;
      }
    }
    setmodetail(exar);
    setfsuc(true);
  }

  function daysInMonth(month, year) {
    console.log(month);
    return new Date(year, month, 0).getDate();
  }
  console.log(totalday);
  var labels = [];
  for (let index = 0; index < totalday; index++) {
    labels[index] = "Day " + (index + 1);
  }
  console.log(modetail);
  let val = true;
  if (window.screen.width < 450) val = false;
  const data1 = {
    //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: labels,
    datasets: [
      {
        label: "Expense v/s Day",
        //data: [18, 12, 6, 9, 12, 3, 9],
        data: modetail,

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea, scales);
        },

        borderColor: [
          "rgba(255, 26, 104, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const data = {
    //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: labels,
    datasets: [
      {
        label: "Expense v/s Day",
        //data: [18, 12, 6, 9, 12, 3, 9],
        data: modetail,

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
        borderSkipped: false,
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      },
    ],
  };
  //--------------------------------------------------
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
      const borderColor = [
        "rgba(255, 26, 104, 0.05)",
        "rgba(54, 162, 235, 0.05)",
        "rgba(255, 206, 86, 0.05)",
        "rgba(75, 192, 192, 0.05)",
        "rgba(153, 102, 255, 0.05)",
        "rgba(255, 159, 64, 0.05)",
        "rgba(1, 249, 1, 0.05)",
      ];
      for (let i = 0; i < 31; i++) {
        ctx.save();
        ctx.fillStyle = borderColor[i % 7];
        //ctx.fillRect(10,10,1000,100);
        ctx.beginPath();
        //ctx.fillRect(x.getPixelForValue(i)-(barwidth/2),top+5,barwidth,height-20);
        ctx.arc(x.getPixelForValue(i), top + 5, 5, Math.PI, 2 * Math.PI);
        ctx.arc(x.getPixelForValue(i), top + 5 + height - 10, 5, 0, Math.PI);
        ctx.fill();
      }
    },
  };
  // option for line chart
  const options1 = {
    maintainAspectRatio: val,
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
  function getGradient(ctx, chartArea, scales) {
    const gradientBg = ctx.createLinearGradient(
      chartArea.left,
      0,
      chartArea.right,
      0
    );
    gradientBg.addColorStop(0, "rgba(255, 26, 104, 1)");
    gradientBg.addColorStop(0.2, "rgba(54, 162, 235, 1)");
    gradientBg.addColorStop(0.4, "rgba(255, 206, 86, 1)");
    gradientBg.addColorStop(0.6, "rgba(75, 192, 192, 1)");
    gradientBg.addColorStop(0.8, "rgba(153, 102, 255, 1)");
    gradientBg.addColorStop(1, "rgba(255, 159, 64, 1)");
    return gradientBg;
  }

  const options = {
    maintainAspectRatio: val,
    plugins: {
      indexAxis: "y",
      legend: {
        // display:false
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

  // line -194   <div className='chartstat shadow-lg p-2  rounded mx-2 my-2'><Line  data={data} /></div>

  //--------------------------------------------------
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
            <div className="col-lg-6 col-md-12 mycalback rounded">
              <h3>Your {monthname[selmon]} Month Expense Statistics</h3>
              <div className="row">
                {(() => {
                  let rows = [];
                  for (let i = 0; i < modetail.length; i++) {
                    console.log(selmon);
                    rows.push(
                      <div className="col-md-2 col-sm-4 col-4" key={i}>
                        <div
                          className="mycal rounded"
                          id="mycalmonth"
                          onClick={() => {
                            localStorage.setItem("day", i + 1);
                            localStorage.setItem("mon", parseInt(selmon) + 1);
                            navigate("../history");
                          }}
                        >
                          <p className="eraser">{labels[i]}</p>
                          <p className="eraser">Rs {modetail[i]}</p>
                        </div>
                      </div>
                    );
                  }
                  return rows;
                })()}
              </div>
            </div>
            <div className="col-lg-6 monthchart yrstatspmar">
              {window.screen.width > 500 ? (
                <div className="chartstat shadow-lg p-2 rounded mx-2 my-2">
                  <Bar data={data} options={options} plugins={[progressBar]} />
                </div>
              ) : (
                <div className="chartstat shadow-lg p-2  rounded mx-2 my-2">
                  <Line data={data1} options={options1} />
                </div>
              )}
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

export default Monthstat;
