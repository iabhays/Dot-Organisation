import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './style/Register.css'

const Register = () => {
    const [email,setemail] = useState('');
    const [pass, setpass] = useState('');

    function Register(e){
      let data={
        email:email,
        password:pass
      }

      axios.post('http://localhost:5000/register',data).then(resp=>{
      if(resp) {
      alert("Succesfully Registered now Login")
      }else{
        alert("Not Registered")
      }
      })
      .catch(err => console.log(err))
    }
    return (
        <div className='containerRegister'style={{overflow: 'hidden'}}>
            <h2 className='m-5 text-center' >Register To Dot.. Organization</h2>
           <form onSubmit={(e)=>Register(e)} className='col-md-5 mx-auto' >
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" value={email} className="form-control" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" value={pass} className="form-control" onChange={(e)=>{setpass(e.target.value)}} placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Register</button>
            </form>
            <Link to='/' style={{textDecoration:'none', color: '#fff'}} className='text-center mt-5'><h5>👉Already a member? Login HERE👈</h5></Link>
        </div>
    )
}

export default Register
