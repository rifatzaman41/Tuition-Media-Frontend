const loadServices = () => {
    fetch("http://127.0.0.1:8000/services")
        .then(res => res.json())
        .then((data) => displayService(data))
        .catch((err) => console.log(err));
};
const displayService = (services) => {
    console.log(services);
    services.forEach((service) => {
        const parent = document.getElementById("service-container");
        const li = document.createElement("li");
        li.innerHTML = `
 <div class="card shadow h-100">
                    <div class="ratio ratio-16x9">
                        <img src=${service.image}
                        class="card-img-top" 
                        loading="lazy" 
                        alt="..."/>
                    </div>
                    <div class="card-body  p-3 p-xl-5">
                        <h3 class="card-title h5">${service.name}</h3>
                        <p class="card-text">${service.description}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
`;
        parent?.appendChild(li);
        

    });
};

const loadTeachers = (search="") => {
    document.getElementById("teachers");
    const parent = document.getElementById("teachers");
    if (!parent) return; // Exit if the parent element does not exist
    parent.innerHTML = "";
    document.getElementById('spinner').style.display="block";
    
    fetch(`http://127.0.0.1:8000/tuition/teacher/?search=${search}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("spinner").style.display = "none";
            displayTeachers(data?.results || []);

})
.catch((err) => {
    console.error("Error loading teachers:", err);
    document.getElementById("spinner").style.display = "none";
});

};


const displayTeachers = (teachers) => {
    const parent = document.getElementById("teachers");
    if (!parent) return;  // Ensure parent exists
    parent.innerHTML = ""; 

    if (teachers.length == 0) {  
        const notFoundImage = document.createElement("img");
        notFoundImage.src = "./images/not.jpg"; 
        notFoundImage.alt = "No results found";
        notFoundImage.classList.add("not-found-image");
        parent.appendChild(notFoundImage);
        return;
    }
        teachers.forEach((teacher) => {
            const div = document.createElement("div");
            div.classList.add("teacher-card");
            div.innerHTML = `
                <img class="teacher-img" src="${teacher.image}" alt="">
                <h4>${teacher?.user}</h4>
                <h6>${teacher?.specialization}</h6>
                <p>fdsdff</p>
                <p>
                ${
                    teacher?.specialization.map((item) => {
                        return `<button>${item}</button>`;
                    })
                }
                </p>
                <button><a target="_blank" href="tecDetails.html?teacherId=${teacher.id}">Details</a></button>
            `;
            parent.appendChild(div);
        });
    };


const loadSpecialization = () => {
    fetch("http://127.0.0.1:8000/tuition/specialization")
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("drop-spe");
            data.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add("dropdown-item");

                
                li.innerHTML = item.name;

                
                li.onclick = () => loadTeachers(item.name);

                parent?.appendChild(li);
            });
        })
      //  .catch((error) => console.error("Error loading specializations:", error));
};

const handleSearch=()=>{
    const value=document.getElementById("search").value;
    loadTeachers(value); 
};


const loadReview=()=>{
    fetch("http://127.0.0.1:8000/tuition/reviews")
        .then((res)=>res.json())
        .then((data)=>displayReview(data));
    
};

const displayReview=(reviews)=>{
reviews.forEach((review)=>{
    const parent=document.getElementById("review-container");
    const div=document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML=`
       <img src="./images/review.jpg" alt=""> 
       <h4>${review.reviewer_name}</h4>
       <p>
      ${review.body}
       </p>
       <h6>${review.rating}</h6>
    
    `;
    parent?.appendChild(div)
});
};

loadSpecialization();
loadTeachers();
loadServices();
loadReview();