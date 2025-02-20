const loadUserDetails=()=>{
    const user_id=localStorage.getItem('user_id');
fetch(`http://127.0.0.1:8000/profile1/registers/${user_id}`)
.then(res=>res.json())
.then((data)=>{
const parent=document.getElementById("user-details-container")
const div=document.createElement("user-all");
div.classList.add("user-all")
div.innerHTML=`
<div class="user-img">
  <img src="images/user.jpeg" alt="">
    </div>
    <div class="user-info">
        <h1>${data.username}</h1>
        <h3>${data.first_name+data.last_name}</h3>
        <h3>${data.email}</h3>

    </div>
`;
parent.appendChild(div);
});
};
loadUserDetails();