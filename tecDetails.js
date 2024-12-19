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
    (teacher.specialization || []).map((item) => {
        return `<button class="tec-detail-btn">${item}</button>`;
    }).join("")
    })
   }
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
    fetch(`http://127.0.0.1:8000/tuition/available_time/?teacher_id=${id}`)
     .then((res)=>res.json())
     .then((data)=>{
        data.forEach((item)=>{
            const parent=document.getElementById("time-container");
            const option=document.createElement("option");
            option.value=item.id;
            option.innerText=item.name;
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
const info={
appointment_type:selected.value,
appointment_status:pending,
time:selectedTime.value,
symtom:symtom,
cancel:false,
patient:1,
doctor:param,
};

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


getparams();