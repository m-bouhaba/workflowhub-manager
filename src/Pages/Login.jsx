import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Style/Login.css';


export default function Login({ setUsername }) {  

  const [error, setError] = useState(""); 

  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleChange=(e) =>{
    const {name,value } = e.target
    setFormData((prev) =>({
        ...prev,
        [name] : value
    }))
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.username === "" || formData.email === "" || formData.password === ""){
      setError("All fields are required");
    } else {
      setError("");
      setUsername(formData.username);        
      localStorage.setItem("username", formData.username); 
      navigate("/home");   
    }
  };

  return (
    <div className='login-container'>
      <div className='image-container'>
        <img src="/login.png" alt="WorkflowHub Logo" />
      </div>

      <div className='form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          
          <label>Username:</label>
          <input type="text" value={formData.username} name='username' onChange={handleChange} placeholder="Enter username" />

          <label>Email:</label>
          <input type="email"value={formData.email} name='email' onChange={handleChange} placeholder="Enter email" />

          <label>Password:</label>
          <input type="password" value={formData.password} name='password' onChange={handleChange} placeholder="Enter password" />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
      
        </form>
      </div>
    </div>
  );
}




 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 




































// import React from 'react'
// import '../Style/Login.css';  
// import { useState } from 'react';




//  const [username, setUsername] = useState("");
// const [password, setPassword] = useState("");


// export default function Login() {


//   return (
//     <div className='login-container'>
//       <div className='image-container'>
//         <img src="login.png" alt="WorkflowHub Logo" />
//       </div>
//       <div className='form-container'>
//         <form className='login-form'>
//             <h2>Sign Up</h2>  
           
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" placeholder=" Enter email" value={Username} onChange={(e) => setUsername(e.target.value)}required />
         
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}required />
           
//           <button type="submit">Login</button>
         
//         </form>  
//       </div>
//       </div>
    
//   );
// }
