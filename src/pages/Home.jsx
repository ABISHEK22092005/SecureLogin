import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/authApi';
const Home = () => {
  // const [message, setMessage] = useState("");

  // useEffect(()=>{
  //   const token = localStorage.getItem("token");

  //   fetch("http://localhost:8080/test")
  //   .then((response)=> response.text())
  //   .then((data)=>{
  //     setMessage(data);
  //   });
  // },[]);

  // useEffect(()=>{
  //   const token = localStorage.getItem("token");

  //   console.log("TOKEN:", token)

  //   fetch("http://localhost:8080/api/profile",{
  //     method:"GET",
  //     headers:{
  //       Authorization:`Bearer ${token}`
  //     }
  //   })
  //   .then((response)=> response.text())
  //   .then((data)=>{
  //     console.log("PROFILE RESPONSE : ",data)
  //     setMessage(data)})
  //   .catch((error)=>{
  //     console.error("PROFILE ERROR: ",error)
  //     setMessage("Not Authorized")
  // })
  // },[]);
  const navigate = useNavigate();
  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ["profile"],

    queryFn: getProfile
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Not Authorized</h1>
  }
  return (

    <div>
      <h1 className="text-3xl font-bold text-purple-600 ">
        Welcome Home

      </h1>
      <p className='mt-4 text-lg'>
        {data}
      </p>

      <p>Fetching : {isFetching ? "yes" : "no"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Reload Page
      </button>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      
      }} className='mt-6 px-4 py-2 bg-red-500 text-white rounded'>
        logout
      </button>

    </div>
  )
}

export default Home
