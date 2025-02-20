const loadAllAppointment=()=>{
    const student_id=localStorage.getItem("student_id");
    fetch(`http://127.0.0.1:8000/appointment/appointment/?student_id=${student_id}`)
    .then((res)=>res.json())
    .then((data)=>{
      data.forEach((item)=>{
        const parent=document.getElementById("table-body");
        const tr=document.createElement("tr");
        tr.innerHTML=`
              <tr>
        <th>${item.id}</th>
        <td>${item.symtom}</td>
        <td>${item.appointment_types}</td>
        <td>${item.appointment_status}</td>
        <td>${item.teacher}</td>
       
       ${item.appointment_status=="Pending"?
        `<td class="text-danger">x</td>`
:`<td>X<td>`
       }
        <td>1200</td>
      </tr>
        `;
        parent.appendChild(tr);
      });
    });
};

loadAllAppointment();