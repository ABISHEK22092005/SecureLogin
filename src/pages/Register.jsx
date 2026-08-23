import React,{useState} from 'react'
import { registerUser } from '../api/authApi';
const Register = () => {

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword]=useState("");
  const[message, setMessage]=useState("");
  const[error,setError]=useState("");

  const emailPatter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async(e)=>{
    e.preventDefault();
    setMessage("");
    setError("");
//validation
if(name.trim()===""){
  setError("Name is required");
  return
}
if(email.trim()===""){
  setError("email is required");
  return;
}

if(!emailPatter.test(email)){
  setError("Enter a valid email");
  return
}

if(password.trim()===""){
  setError("Password is required");
  return;
}

if(password.length<8){
  setError("Password must be at least 8 charaters");
  return;
}

try{
  // const response = await fetch(
  //   "http://localhost:8080/api/auth/register",
  //   {
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
  //             },
  //     body: JSON.stringify({
  //       name:name,
  //       email: email,
  //       password:password
  //                   })
  //   }
  // );
  
  // const data = await response.text();
  // console.log("REGISTER RESPONSE:", data);

  // if(!response.ok){
  //   setError(data);
  //   return;
  // }
  // setMessage(data);
   const data = await registerUser(
    name,
    email,
    password
  );

  console.log("REGISTER RESPONSE:", data);

  setMessage(data);

}
  catch(error){
    console.error("REGISTER ERROR:", error);
    setError("Unable to connect to server");
  }
};
  return (
    <div>
      <h1>register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" 
        placeholder="Name"
         value={name} 
         onChange={(e)=>setName(e.target.value)}
          />

          <input type="email" 
          placeholder='Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

          <input type="password" 
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} />

          {error && (
            <p>{error}</p>
          )}

          {message && (
            <p>{message}</p>
          )}

          <button type='submit'>
            Register
          </button>
      </form>
    </div>
  )
}

export default Register
