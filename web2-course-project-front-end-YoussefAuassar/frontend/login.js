"use strict";

document.getElementById("loginform").addEventListener("submit", (event) => {
	event.preventDefault();

	let user = {};

	user.email = document.getElementById("inputEmail").value;
	user.password = document.getElementById("inputPassword").value;

	console.log(user.email, user.password);

	// Check for login
	getData("http://localhost:3100/login", "POST", user).then((result) => {
		sessionStorage.setItem("user", JSON.stringify(result.data));
	});
});

async function getData(url, method, data) {
	let resp = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return await resp.json();
}
