/* ================================
CHECK ADMIN AUTH
================================ */

checkAdminAuth();


/* ================================
ELEMENTS
================================ */

const messagesTable = document.getElementById("messagesTable");


/* ================================
LOAD MESSAGES
================================ */

async function loadMessages(){

try{

const snapshot = await messagesRef
.orderBy("createdAt","desc")
.get();

messagesTable.innerHTML = "";

snapshot.forEach(doc => {

const data = doc.data();
const id = doc.id;

const row = document.createElement("tr");

row.innerHTML = `

<td>${data.name}</td>

<td>${data.email}</td>

<td>${data.message}</td>

<td>

<button class="admin-btn btn-delete" onclick="deleteMessage('${id}')">
Delete
</button>

</td>

`;

messagesTable.appendChild(row);

});

}catch(error){

console.error("Message load error:",error);

}

}


/* ================================
DELETE MESSAGE
================================ */

async function deleteMessage(id){

const confirmDelete = confirm("Delete this message?");

if(!confirmDelete) return;

try{

await messagesRef.doc(id).delete();

loadMessages();

}catch(error){

console.error("Delete error:",error);

}

}


/* ================================
LOGOUT
================================ */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click", async () => {

await auth.signOut();

window.location.href="login.html";

});

}


/* ================================
INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", () => {

loadMessages();

});