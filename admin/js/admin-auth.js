/* ================================
ADMIN LOGIN
================================ */

document.addEventListener("DOMContentLoaded", () => {

const loginForm = document.getElementById("loginForm");

if(!loginForm) return;

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value.trim();

const errorBox = document.getElementById("loginError");

errorBox.textContent = "";

try{

await auth.signInWithEmailAndPassword(email,password);

/* LOGIN SUCCESS */

window.location.href = "dashboard.html";

}catch(error){

console.error("Login error:",error);

errorBox.textContent = "Invalid email or password";

}

});

});


/* ================================
CHECK ADMIN SESSION
================================ */

function checkAdminAuth(){

auth.onAuthStateChanged((user)=>{

if(!user){

window.location.href="login.html";

}

});

}