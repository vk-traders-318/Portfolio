/* ================================
CONTACT FORM SUBMIT
================================ */

document.addEventListener("DOMContentLoaded", () => {

const contactForm = document.getElementById("contactForm");

if(!contactForm) return;

contactForm.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value.trim();

const email = document.getElementById("email").value.trim();

const message = document.getElementById("message").value.trim();

if(!name || !email || !message){

showToast("Please fill all fields");

return;

}

try{

await messagesRef.add({

name: name,

email: email,

message: message,

createdAt: firebase.firestore.FieldValue.serverTimestamp()

});

contactForm.reset();

showToast("Message sent successfully");

}catch(error){

console.error("Message error:",error);

showToast("Failed to send message");

}

});

});


/* ================================
TOAST MESSAGE
================================ */

function showToast(message){

let toast = document.querySelector(".toast");

if(!toast){

toast = document.createElement("div");

toast.className = "toast";

document.body.appendChild(toast);

}

toast.textContent = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}