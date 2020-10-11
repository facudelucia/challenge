import React,{useState, useEffect} from 'react';
import './Login.css';
import axios from "axios"
import { useStateValue } from './StateProvider';
import {useHistory} from "react-router-dom"
function Login() {
const history = useHistory()

const [form, setForm] = useState({
    username: "",
    password: ""
  })

const {username, password} = form

const [remember, setRemember] = useState(false)

const [error, setError] = useState(false)

const [msg, setMsg] = useState("")

const rememberMe = (e) => {
  setRemember(!remember)
}

const[{token}, dispatch]= useStateValue()

const handleInputChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

const headers = {
  'Content-Type': 'application/json' 
} 

const handleSubmit = async (e) => {
  e.preventDefault()
  if(username.trim() === ""){
    setError(true)
    setMsg("Username is empty")
    return
  }
  if(password.trim() === ""){
    setError(true)
    setMsg("Password is empty")
    return
  }
   await axios.post("http://churrasco.uk.to:3005/api/auth",{
    "email": `${username}`,
    "password": `${password}`,
    headers
  })
  .then(datos=>{
    dispatch({
      type:"LOGIN",
      token: datos.data
    })
    if(token){
      history.push("/home")
    }
    setError(false)
  })
  .catch(error=>{
    console.log(error)
    setError(true)
    setMsg("Wrong Credentials")
  })
  if(remember){
    localStorage.setItem("username", `${username}`)
    localStorage.setItem("password", password)
  }
}

useEffect(() => {
  if(localStorage.getItem("username") && localStorage.getItem("password")){
    setForm({
      username: localStorage.getItem("username"),
      password:localStorage.getItem("password")
    })
  }
}, [])
const closeAlert = () => {
  setError(false)
}
  return (
    <div className="login">
      <div className="login__logo">
        <img src={"./assets/LOGO1.png"}/>
      </div>
      
    <form onSubmit={handleSubmit}>
      <div className="login__input"> 
      
        <div className="login__inputText login__username">
        <i className="login__icon fas fa-user"></i>
          <input 
            type="text"
            placeholder="Username"
            className="login__username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>

        <div className="login__inputText login__password">
        <i className="login__icon fas fa-lock"></i>
          <input 
            type="password"
            placeholder="Password"
            className="login__password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>

      </div>
      {error && 
        <div className="login__alert">
        <span className="login__alertButton" onClick={()=>closeAlert()}>&times;</span>
        {msg}
        </div>
      }
      <div className="login__buttons">
        <div className="login__remember">
          <input 
            type="checkbox" 
            id="rememberMe"
            onChange={rememberMe}
          /> 
        <label htmlFor="rememberMe">remember</label>
        </div>
        <input
          type="submit"
          value="Log In"
          className="login__button"
        />
      </div>
      </form>
    </div>
  );
}

export default Login;
