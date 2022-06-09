import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../css/Login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../images/company_logo.png";

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: ""
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  notify(msg)
  {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    if (navigator.onLine) 
    {
      try {

        if(!user.email || user.email.length === 0)
        {
          this.notify("Invalid email address");
        }
        else if(!user.password || user.email.password === 0)
        {
          this.notify("Invalid password");
        }
        else
        {
          if (user) 
          {
            const { data } = await axios.post(
              "https://ensolapi.herokuapp.com/admin/auth",
              user
            );

            console.log(data);
            
            if (data.status) 
            {
              sessionStorage.setItem("token", data.accessToken);
              sessionStorage.setItem("email", this.state.email);
              window.location.href = "/dashboard";
            } 
            else 
            {
              this.notify(data.data);
            }
          } 
          else 
          {
            this.notify("Failed to get values of the fields");
          }
        }
      } 
      catch (error) 
      {
        this.notify(error.message + " : " + error.response.data);
      }
    } else 
    {
      this.notify("Please check your internet connection");
    }
  };

  render() {
    const { email, password } = this.state;
    return (
        <div className='login'>
        <Link to='/'>
            <img
                alt="logo image"
                className="login_logo"
                src={logo} 
            />
        </Link>

        <div>
          <ToastContainer />
        </div>

        <div className='login_container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' name="email" value={email} onChange={this.changeHandler} className="login_text"/>

                <h5>Password</h5>
                <input type='password' name="password" value={password} onChange={this.changeHandler} className="login_text"/>

                <button type='submit' className='login_signInButton' onClick={this.submitHandler}>Sign In</button>
            </form>
        </div>
    </div>
    );
  }
}

export default Login;
