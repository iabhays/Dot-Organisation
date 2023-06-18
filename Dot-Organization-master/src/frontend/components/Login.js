import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

import './style/Login.css'

const Login = () => {
    const [email,setemail] = useState('');
    const [pass,setpass] = useState('');
    const [msg,setmsg] = useState('');
    const navigate = useNavigate();

    function Logincheck(e){
      e.preventDefault()
      let data={
        email:email,
        password:pass
      }

      axios.post('http://localhost:5000/login',data)
    .then(resp=>{
      if(resp.data=="1"){
      setmsg("Successful Login")
      navigate('/home');
    }
      else if(resp.data=="0")
      setmsg("Invalid Credentials")
      else
      setmsg("No user Found Click on Register")
    })
    .catch(err=>console.log(err))

    }

    
    return (
        <div className='containerLogin' style={{overflow: 'hidden'}} >
            <h2 className='m-5 text-center' >Login To Dot.. Organization</h2>
           <form onSubmit={(e)=>Logincheck(e)} className='col-md-5 mx-auto' >
                <h5 className='p-3 text-center text-white' >{msg}</h5>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" value={email} className="form-control" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" value={pass} className="form-control" onChange={(e)=>{setpass(e.target.value)}} placeholder="Password" required />
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                  <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary mb-3">Submit</button>
            </form>
            <Link to='/register' style={{textDecoration:'none', color: '#fff'}} className='text-center mt-5'><h5>👉Not a member? Register HERE👈</h5></Link>
 
        </div>
    )
}

export default Login
