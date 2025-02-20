const handleLogOut=()=>{
    const token=localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/profile1/logout/`,{
    method:"POST",
    headers:{
"Authorization":'Token ${token}',
"Content-Type":"application/json",
    },
    })
    .then((res)=>res.json())
.then((data)=>{
    console.log(data);
    localStorage.removeItem("token");
    localStorage.removeItem("student_id");
});
};
