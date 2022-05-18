import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../css/Login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      password: this.state.password,
      fcm: "asd",
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
              "https://ensolapi.herokuapp.com/auth",
              user
            );

            console.log(data);
            
            if (data.status) 
            {
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
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
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

            <p>By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>

            <button className='login_registerButton' >Create your Amazon Account</button>
        </div>
    </div>
    );
  }
}

export default Login;
