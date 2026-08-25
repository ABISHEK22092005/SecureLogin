import React,{useState} from 'react'
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { Link } from 'react-router-dom';

const Login = () => {

    const[email,setEmail] = useState("");
    const[password, setPassword] = useState("")
    const[error,setError] = useState("");
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const loginMutation = useMutation({
     

      mutationFn:()=> loginUser(email,password),
      
      onSuccess:(data)=>{
        console.log("JWT TOKEN:", data);
        localStorage.setItem("token",data);
        navigate("/home")
      },
      onError:(error)=>{
        setError(error.message);
      }
    })
    const handlelogin = (e) =>{
      e.preventDefault();

      setError("");
      if(email.trim()===""){
        setError("Email is required");
        return
      }
      if(!emailpattern.test(email)){
        setError("Enter a valid Email");
        return
      }

      if(password.trim()===""){
        setError("Password is required");
        return;
      }

      loginMutation.mutate();
  

    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-white'>
          Welcome Back
        </h1>
        <p className='text-white/70 mt-2'>
        Sign in to continue
        </p>
        <form onSubmit={handlelogin}>
        <div className='mb-4'>
     <label className='block text-white mb-2'>Email </label>
     <input type="email"  placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full px-4 py-3 rounder-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/15 transition rounded-xl'/>
        </div>

          <div className='mb-4'>
     <label className='block text-white mb-2'>Password </label>
     <input type="password"  placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full px-4 py-3 rounder-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/15 transition rounded-xl'/>
        </div>

      <div className='text-rigt mb-6'>
    <a href="#" className='text-white/70 hover:text-white text-sm transition'>
      Forget Password?
    </a>
      </div>
      {error&&(
        <p className='text-red-400 text-sm mt-4'>
          {error}
        </p>
      )

      }

    <button type='submit' disabled={loginMutation.isPending}  className='w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-white/90 transition duration-300 shadow-lg'>
     {loginMutation.isPending ? "Signing In ..":"Sign In"}
    </button>
</form>
      <p className='text-centre text-white/70 mt-6'>
      Don't have an account ?{' '}
        {/* <a href="" className='text-white font-semibold hover:underline'>
          Register
        </a> */}
        <Link to="/register" className="text-white font-semibold hover:underline"
        >Register</Link>
      </p>
     
      </div>
    </div>
     </div>
  )
}

export default Login
