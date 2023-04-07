import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import {Dna} from 'react-loader-spinner';
function Log() {

    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();
    const [fetchsuccess,setfsuc]=useState(true);
    useEffect(()=>{
        if(localStorage.getItem("token"))
        navigate("./")
    },[])

    const handleSubmit = async (e) => {
        setfsuc(false);
        e.preventDefault();
        const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.res_Status){
            // Save the auth token and redirect
            localStorage.setItem("token",json.authtoken);
            alert(json.message);
            navigate("../main");

        }
        else{
            alert(json.error);
        }
        setfsuc(true);
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    var lst={
        display:"flex",
        justifyContent:"center",
        position:"relative",
        top:200
    };
    var st={
        textAlign:"center",
        padding:4
    };
    return(
        <>
        {fetchsuccess==false&&<div className="loader-container"><Dna 
  visible={true}
  height="200"
  width={window.screen.width}
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/></div>}
        <form onSubmit={handleSubmit}>
        <div  style={lst}>
            <div className="wrap">
            <h2  style={st}>Log in</h2>
            <fieldset>
        <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={credentials.email} onChange={onChange} name="email"/>
  <label htmlFor="floatingInput" >Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  value={credentials.password} onChange={onChange} name="password"/>
  <label htmlFor="floatingPassword">Password</label>
  <Link to="../otpgen"><p>Forgot password?</p></Link>
</div>
<div className='d-grid gap-2 my-4'>
<button className='btn  btn-primary'>Submit</button>
</div>
<div className='d-grid gap-2 my-4'>
<Link to="/sign"><button className='btn  btn-dark'>Sign up</button></Link>
</div>
</fieldset>
</div>
</div>
<div></div>
</form>
<Outlet/>
        </>
    );
    }

export default Log;