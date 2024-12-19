const handleRegistration = (event) => {
    event.preventDefault();

    
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };

    
    if (password === confirm_password) {
        document.getElementById("error").innerText = "";


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (passwordRegex.test(password)) {
            console.log(info);
            fetch("http://127.0.0.1:8000/profile1/",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify(info),
            })
            .then(res=>res.json())
            .then((data)=>console.log(data));
        } else {
            document.getElementById("error").innerText =
                "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
        }
    } else {
        document.getElementById("error").innerText = "Passwords do not match.";
        alert("Passwords do not match.");
    }
};

const getValue = (id) => {
    return document.getElementById(id).value;
};

