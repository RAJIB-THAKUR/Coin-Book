import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import {Dna} from 'react-loader-spinner';
function Profile() {
    let navigate = useNavigate();
    const [fetchsuccess,setfsuc]=useState(true);
    const [profdet,setprofdet]=useState([]);
    const [extypead,setextypead]=useState();
    const [etypespresent,setpretype]=useState([]);
    // const [newpass,setnpass]=useState();
    // const [passchangepossible,setchangeposs]=useState(false);
    useEffect(()=>{
        if(!localStorage.getItem("token"))
        navigate("../")
        fetchprofdetail();
        fetchexpensetype();
    },[])
//profile details fetch
async function fetchprofdetail() {
  setfsuc(false);
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Profile_Details", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token")})
});
const json = await response.json()
// console.log(json);
const element=[]
element[0]=json.data.name;
element[1]=json.data.mobile;
element[2]=json.data.email;
// console.log(element);
setprofdet(element);
setfsuc(true);
}

//fetch expense type
async function fetchexpensetype() {
  setfsuc(false);
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Types", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token")})
});
const json = await response.json()
if(json.message=="ok"){
  setpretype(json.data.expense_Type_List);
}
setfsuc(true);
}

//add expense type
async function addexpensetype() {
  setfsuc(false);
  if(extypead.toUpperCase()=="OTHER"||extypead.toUpperCase()=="TRAVEL"||extypead.toUpperCase()=="FOOD"||extypead.toUpperCase()=="GENERAL"){
    alert("This type exists by default")
  }
  else{
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/add_User_Expense_Type", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),expense_Type:extypead})
});
const json = await response.json()
fetchexpensetype();
alert(json.message)}
setfsuc(true);
}


   
    return(
        <>
        {fetchsuccess==false&&<div className="loader-container"><Dna 
  visible={true}
  height="200"
  width={window.screen.width}
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/></div>}<div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          
            <div id='profilebox' className=' rounded'>
              <div className='row'>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Name:</p> <input type="text" class="form-control" disabled value={profdet[0]}></input></div>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Mobile:</p> <input type="text" class="form-control" disabled value={profdet[1]}></input></div>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Email:</p> <input type="text" class="form-control" disabled value={profdet[2]}></input></div>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Regular expense types:</p> 
        <div class="dropdown">
  <button class="btn btn-light dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Expense types
  </button>
  <ul class="dropdown-menu">
    {(()=>{
        let rows = [];
        rows.push(
          <><li><button class="dropdown-item" type="button" key={100}>General</button></li>
          <li><button class="dropdown-item" type="button" key={101}>Food</button></li>
          <li><button class="dropdown-item" type="button" key={102}>Travel</button></li>
          <li><button class="dropdown-item" type="button" key={103}>Others</button></li>
          </>);
        for (let i = 0; i < etypespresent.length; i++) {
          rows.push(
            <li><button class="dropdown-item" type="button" key={i}>{etypespresent[i].expense_Type}</button></li>
            );
        }
        return rows;
    })()}
  </ul>
</div>
        </div>
        <div className='profelement col-sm-6 col-md-4 col-12'>
            Add your regular expense types:
            <form className='row g-2 my-2'>
            <div className="col-lg-10 col-md-10 col-sm-10 col-auto">
    <label htmlFor="inputPassword2" className="visually-hidden">Add your regular expense type</label>
    <input type="text" className="form-control" id="inputPassword2" placeholder="Eg:Food" value={extypead} onChange={(e)=>{setextypead(e.target.value)}}/>
  </div>
  <div className="col-lg-2 col-md-2 col-sm-2 col-auto">
    <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{e.preventDefault();addexpensetype()}}>Add</button>
  </div></form>
        </div>
        </div>
        <div className='d-flex justify-content-between'>
        <button className='btn btn-danger' onClick={()=>{localStorage.clear(); navigate("../");}} >log out</button>

        </div>
        </div>
        </div>
      </div>
<Outlet/>
        </>
    );
    }

export default Profile;