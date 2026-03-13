/* ================================
CHECK ADMIN AUTH
================================ */

checkAdminAuth();


/* ================================
ELEMENTS
================================ */

const addProjectBtn = document.getElementById("addProjectBtn");
const projectFormContainer = document.getElementById("projectFormContainer");
const projectForm = document.getElementById("projectForm");
const projectsTable = document.getElementById("projectsTable");


/* ================================
TOGGLE FORM
================================ */

if(addProjectBtn){

addProjectBtn.addEventListener("click", () => {

if(projectFormContainer.style.display === "none"){

projectFormContainer.style.display = "block";

}else{

projectFormContainer.style.display = "none";

}

});

}


/* ================================
LOAD PROJECTS
================================ */

async function loadProjects(){

try{

const snapshot = await projectsRef
.orderBy("createdAt","desc")
.get();

projectsTable.innerHTML = "";

snapshot.forEach(doc => {

const data = doc.data();
const id = doc.id;

const row = document.createElement("tr");

row.innerHTML = `

<td>${data.title}</td>

<td>
<a href="${data.liveLink}" target="_blank">View</a>
</td>

<td>
<a href="${data.githubLink}" target="_blank">Code</a>
</td>

<td>

<button class="admin-btn btn-delete" onclick="deleteProject('${id}')">
Delete
</button>

</td>

`;

projectsTable.appendChild(row);

});

}catch(error){

console.error("Projects load error:",error);

}

}


/* ================================
ADD PROJECT
================================ */

projectForm.addEventListener("submit", async (e) => {

e.preventDefault();

const title = document.getElementById("projectTitle").value.trim();
const description = document.getElementById("projectDescription").value.trim();
const liveLink = document.getElementById("projectLiveLink").value.trim();
const githubLink = document.getElementById("projectGithubLink").value.trim();

let imageUrl = "";

try{

/* IMAGE UPLOAD */

const imageInput = document.getElementById("projectImage");

if(imageInput.files.length > 0){

imageUrl = await uploadImageToCloudinary(imageInput.files[0]);

}

/* SAVE PROJECT */

await projectsRef.add({

title: title,
description: description,
liveLink: liveLink,
githubLink: githubLink,
image: imageUrl,
createdAt: firebase.firestore.FieldValue.serverTimestamp()

});

projectForm.reset();

projectFormContainer.style.display = "none";

loadProjects();

}catch(error){

console.error("Project add error:",error);

}

});


/* ================================
DELETE PROJECT
================================ */

async function deleteProject(id){

const confirmDelete = confirm("Delete this project?");

if(!confirmDelete) return;

try{

await projectsRef.doc(id).delete();

loadProjects();

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

loadProjects();

});