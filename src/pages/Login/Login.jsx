import React,{use, useState} from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [Signin,setSignIn]=useState("Sign In")

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false)

  const user_auth=async (e)=>{
    e.preventDefault();
    setLoading(true)
if(Signin==="Sign In")
{
  await login(email,password)
}
else{
  await signUp(name,email,password)
}
setLoading(false)
  }
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} alt=""  className='login-logo'/>
      <div className="login-form">
        <h1>{Signin}</h1>
        <form>
          {Signin==="Sign Up"? <input type="text" placeholder='Enter your name'  value={name} onChange={(e)=>setName(e.target.value)}/>:<></>}
         
          <input value={email}  onChange={(e)=>setEmail(e.target.value)}type="email" placeholder='Enter your email' />
          <input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
          <button onClick={user_auth} type='submit'>{Signin}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"  />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {Signin==="Sign In" ? <p>New to Netflix? <span onClick={()=>setSignIn("Sign Up")}> Sign Up Now</span></p>:<p>Already have account? <span onClick={()=>setSignIn("Sign In")}>Sign In Now</span></p>}
          
          
        </div>

      </div>
    </div>
  )
}

export default Login
