const getparams=()=>{
const param=new URLSearchParams(window.location.search).get("teacherId");
if (!param) {
    console.error("Teacher ID is missing in the URL.");
    //document.getElementById("tec-details").innerHTML = "<p>Teacher ID is missing. Please go back and select a teacher.</p>";
    return; // Exit if teacherId is not present
}
loadTime(param);
fetch(`http://127.0.0.1:8000/tuition/teacher/${param}`)
    .then(res=>res.json())
    .then((data=>displayDetails(data)))
    .catch((err) => console.error("Error fetching teacher details:", err));

fetch(`http://127.0.0.1:8000/tuition/reviews/?teacher_id=${param}`)
.then(res=>res.json())
.then(data=>TeacherReview(data))
.catch((err) => console.error("Error fetching teacher reviews:", err));
};

const TeacherReview=(reviews)=>{
        reviews.forEach((review)=>{
        const parent=document.getElementById("tec-details-review");
        const div=document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML=`
        <div class="review-card">
           <img src="./images/review.jpg" alt=""> 
           <h4>${review.reviewer_name}</h4>
           <p>
          ${review.body}
           </p>
           <h6>${review.rating}</h6>
        
        `;
        parent?.appendChild(div);
    });
    };


const displayDetails=(teacher)=>{
const parent=document.getElementById("tec-details");
const div=document.createElement("div");
div.classList.add("tec-details-container");
div.innerHTML=`
<div class="teacher-img">
<img src="${teacher.image}" alt=""/>
</div>
<div class="tec-info">
    <h1>${teacher.user}</h1>
   ${
    (teacher.specialization || []).map((item) => 
         `<button class="tec-detail-btn">${item}</button>`
    ).join("")}

    <p class="w-50">fsifif ffid disid</p>
    <h4>Fees:${teacher.fee} BDT</h4>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Take Appointment
</button>
</div>
`;
parent?.appendChild(div);
};

const loadTime=(id)=>{
    fetch(`http://127.0.0.1:8000/tuition/available_time/?id=${id}`)
     .then((res)=>res.json())
     .then((data)=>{
            const parent=document.getElementById("time-container");
            parent.innerHTML = "";

            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
            });

            console.log(data);
        });
};           

const handleAppointment=()=>{
const param=new URLSearchParams(window.location.search).get("teacherId");
const status=document.getElementsByName("status");
const selected=Array.from(status).find((button)=>button.checked);
const symtom=document.getElementById("symtom").value;
const time=document.getElementById("time-container");
const selectedTime=time.options[time.selectedIndex];
const student_id=localStorage.getItem("student_id");

const info={
appointment_types:selected.value,
appointment_status:"Pending",
time:selectedTime.value,
symtom:symtom,
cancel:false,
student:student_id,
teacher:param,
};
console.log(info);
fetch(`http://127.0.0.1:8000/appointment/appointment/`,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(info),
})
.then(res=>res.json())
.then(data=>{
console.log(data);
});
};

const loadStudentId=()=>{
    const user_id=localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/profile1/list/${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
       localStorage.setItem("student_id",data.id);
    });
};
// const handlePdf=()=>{
//     const teacher_id=new URLSearchParams(window.location.search).get("teacherId");
//     const user_id=localStorage.getItem("user_id");
//     console.log("Teacher ID:",teacher_id);
// console.log("User ID:", user_id);
//     fetch(`http://127.0.0.1:8000/tuition/teacher/${teacher_id}`)
//     .then(res=>res.json())
//     .then((data)=>{
//         fetch(`http://127.0.0.1:8000/profile1/list/${user_id}`)
//         .then(res=>res.json())
//         .then((pdData)=>{
//         const newData=[data,pdData];
//         console.log(newData);
//         const parent=document.getElementById("pdf-container");

        
//         const div=document.createElement("div");
//         div.innerHTML=`
//             <div class="pd d-flex justify-content-around align-items-center">
//         <div class="student teacher p-5">
//         <h1>${newData[1].username}</h1>
//         <h1>${newData[1].first_name} ${newData[1].last_name}</h1>
//         <h4>${newData[1].email}</h4>
//     </div>
//     <div class="teacher">
//     <img class="w-25" src="${newData[0].image}">
//         <h2 class="tec-name">${newData[0].full_name}</h2>
//         <h4>Specialization</h4>
//     </div>
// </div>
// <input class="symtom" type="text">
// <h1 class="text-center p-2 mt-3">Fees: 2000 BDT</h1>
//         `;
//         parent?.appendChild(div);

//         });
//     });


// };

const handlePdf = async () => {
    const teacher_id = new URLSearchParams(window.location.search).get("teacherId");
    const user_id = localStorage.getItem("user_id");

    if (!teacher_id || !user_id) {
        console.error("Missing teacher_id or user_id");
        return;
    }

    try {
        const teacherResponse = await fetch(`http://127.0.0.1:8000/tuition/teacher/${teacher_id}`);
        if (!teacherResponse.ok) throw new Error('Failed to fetch teacher data');
        const teacherData = await teacherResponse.json();

        const userResponse = await fetch(`http://127.0.0.1:8000/profile1/list/${user_id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        const newData = [teacherData, userData];
        console.log(newData);

        const parent = document.getElementById("pdf-container");
        if (!parent) {
            console.error("pdf-container element not found");
            return;
        }

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="pd d-flex justify-content-around align-items-center">
                <div class="student teacher p-5">
                    <h1>${newData.username || "N/A"}</h1>
                    <h1>${newData.first_name} ${newData.last_name}</h1>
                    <h4>${newData.email}</h4>
                </div>
                <div class="teacher">
                    <img class="w-25" src="${newData.image}" alt="Teacher Image">
                    <h2 class="tec-name">${newData.full_name}</h2>
                    <h4>Specialization: ${newData.specialization?.join(', ') || "N/A"}</h4>
                </div>
            </div>
            <input class="symptom" type="text" placeholder="Enter symptoms">
            <h1 class="text-center p-2 mt-3">Fees: ${newData.fee || 2000} BDT</h1>
        `;
        parent.appendChild(div);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

document.addEventListener("DOMContentLoaded", handlePdf);

// handleAppointment();
handlePdf();
loadStudentId();
getparams();
loadTime();        