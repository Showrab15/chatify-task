import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const Login = () => {
  const [err, setErr] = useState('');
  const navigate = useNavigate();
const emailRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      toast('Login Successfully completed');

    } catch (err) {
      setErr(err.message);
    }
  };



  const handleResetPassword =(event)=>{
const email = emailRef.current.value;
console.log(email);
if(!email){
  toast.error('Please Provide Your Email Address for reset the password');
  return
}
sendPasswordResetEmail(auth, email)
.then(()=>{
  toast('please check your email')
})
.catch(error=>{
  setErr(error.message)
})
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span style={{color: 'green'}} className="logo">Chatify </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
        <input required type="email" ref={emailRef} placeholder="Type Your Email" />
          <input required type="password" placeholder="Type Your password" />
          <button style={{backgroundColor: 'green', borderRadius: "8px", cursor: "pointer"}}>Sign in</button>
          {err && <span style={{color: 'red'}}>{err}</span>}
        </form>
        <p style={{fontSize: "18px", fontWeight: '600'}}> <small>Forgot password ? <Link onClick={handleResetPassword}>  Reset Your Password</Link></small></p>
        <p  style={{fontSize: "18px", fontWeight: '600'}}>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;