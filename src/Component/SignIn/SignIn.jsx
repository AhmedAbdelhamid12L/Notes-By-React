import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'

export default function SignUp(props) {
  let[errorSubmit,seterrorSubmit] = useState('');
  let[errorValidate,seterrorValidate] = useState([]);
  let[loading,setLoading] = useState(false);
  let [user,setUser] = useState({
    email:'',
    password:''
  });
function getUser({target})
{
  let myUser = {...user};
  myUser[target.name] = target.value;
  setUser(myUser);
  // console.log(myUser);
}
function validateForm()
{
  let shcema = Joi.object(
    {
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().min(5).max(10).required()
    }
  )
  return shcema.validate(user,{abortEarly:false}); 
}
async function submitForm(e) 
{
  e.preventDefault();
  let validationResult = validateForm();
  // console.log(validationResult.error.details);
  if(validationResult.error)
  {
    seterrorValidate(validationResult.error.details);
  }
  else 
  {
    setLoading(true);
    let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signin`,user);
    // console.log(data);
    if(data.message=='success')
    {
      setLoading(false);
      localStorage.setItem('token' , data.token);
      props.history.push('/home');
    }
    else
    {
      setLoading(false);
      seterrorSubmit(data.message);
    }
  }
}
  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-7 m-auto text-center">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter Email"
                type="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter Your Password"
                type="password"
                name="password"
                className="form-control"
              />
            </div>
            {errorSubmit?'':errorValidate.map((error,index)=><div key={index} className="alert alert-danger my-4 py-1">{error.message}</div>)}
            {errorSubmit?<div className='alert alert-danger my-4 py-1'>{errorSubmit}</div>:''}
            {loading?<button type="submit" className="btn btn-info w-100">waiting <i className='fas fa-spinner fa-spin'></i></button>:<button type="submit" className="btn btn-info w-100">SignIn</button>} 
          </form>
        </div>
      </div>
    </>
  )
}
