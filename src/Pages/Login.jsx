import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Style/Login.css';


export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(username === "" || email === "" || password === ""){
      setError("All fields are required");
    } else if(username !== "admin" || email !== "admin@example.com" || password !== "123SALWA"){
      setError("Incorrect username, email, or password");
    } else {
      setError("");
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
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />

          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />

          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />

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
