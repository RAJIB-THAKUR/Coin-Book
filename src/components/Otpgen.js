import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import {Dna} from 'react-loader-spinner';
function Otpgen() {

    const [credentials, setCredentials] = useState({email: ""}) 
    let navigate = useNavigate();
    const [fetchsuccess,setfsuc]=useState(true);
    useEffect(()=>{
        if(localStorage.getItem("token"))
        navigate("./")
    },[])

    const handleSubmit = async (e) => {
        setfsuc(false);
        e.preventDefault();
        const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/mail_OTP_Forgotten_Password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email})
        });
        const json = await response.json()
        console.log(json);
        alert(json.data);
        if (json.message=="ok"){
            // Save the auth token and redirect
            localStorage.setItem("passtoken",json.token);
            navigate("../otpver");

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
            <h2  style={st}>Verify Email</h2>
            <fieldset>
        <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={credentials.email} onChange={onChange} name="email"/>
  <label htmlFor="floatingInput" >Email address</label>
</div>
<div className='d-grid gap-2 my-4'>
<button className='btn  btn-primary'>Verify</button>
</div>
<div className='d-grid gap-2 my-4'>
<Link to="/sign"><button className='btn  btn-dark'>Sign in</button></Link>
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

export default Otpgen;