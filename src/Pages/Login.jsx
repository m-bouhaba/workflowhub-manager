
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Style/Login.css';
import '../Style/Footer.css';

export default function Login({ setUsername }) {  

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
    if(name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
      if(!emailRegex.test(value)) {
        setError(prev => ({ ...prev, email: "Invalid email" }));
      } else {
        setError(prev => ({ ...prev, email: "" }));
      }
    } else {
      setError(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let hasError = false;

    if(!formData.username.trim()) {
      errors.username = "Username is required";
      hasError = true;
    }

    if(!formData.email.trim()) {
      errors.email = "Email is required";
      hasError = true;
    }

    if(!formData.password.trim()) {
      errors.password = "Password is required";
      hasError = true;
    }

    if(hasError || error.email) {
      setError(prev => ({ ...prev, ...errors }));
      return;
    }

    
    setUsername(formData.username);
    localStorage.setItem("username", formData.username);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/login.png" alt="WorkflowHub Logo" />
      </div>

      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>

          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {error.username && <p className="error-message">{error.username}</p>}

          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {error.email && <p className="error-message">{error.email}</p>}

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {error.password && <p className="error-message">{error.password}</p>}

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
}





























































































 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 









































