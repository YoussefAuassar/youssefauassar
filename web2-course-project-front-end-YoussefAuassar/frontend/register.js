"use strict";

document.getElementById('registerform').addEventListener("submit", event => {
    event.preventDefault();

    let user = {};

    user.email = document.getElementById("inputEmail").value;
    user.username = document.getElementById("inputUsername").value;
    user.password = document.getElementById("inputPassword").value;
    

    console.log(user.email, user.username, user.password);

    // Check for login
    getData("http://localhost:3100/register", "POST", user).then(data => {
        console.log(data);
    });
});

async function getData(url, method, data) {
    let resp = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await resp.json();
}

