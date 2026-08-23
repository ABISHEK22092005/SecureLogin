export const loginUser = async (email, password)=>{
    const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );
    const data = await response.text();
    if(!response.ok){
        throw new Error(data);
    }
    return data;
};

export const registerUser = async(name,email,password)=>{
const response = await fetch(
    "http://localhost:8080/api/auth/register",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    }
);

 const data = await response.text();

  if (!response.ok) {
    throw new Error(data || `HTTP${response.status}`);
  }

  return data;
};


export const getProfile = async()=>{
    const token = localStorage.getItem("token");

    const respone = await fetch(

        "http://localhost:8080/api/profile",
        {
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    // const data = await respone.text();

    if(!respone.ok){
        if(respone.status===401 || respone.status===403){
            localStorage.removeItem("token");
        }
        throw new Error("Not authorized");
    }

    return respone.text();
};