/* ================================
LOAD FEATURED PROJECTS
================================ */

async function loadFeaturedProjects(){

const container = document.getElementById("featuredProjects");

if(!container) return;

showLoader(container);

try{

const snapshot = await projectsRef
.orderBy("createdAt","desc")
.limit(3)
.get();

container.innerHTML = "";

snapshot.forEach(doc => {

const project = doc.data();

const card = createProjectCard(project);

container.appendChild(card);

});

}catch(error){

console.error("Error loading featured projects:",error);

showError(container,"Failed to load projects");

}

}


/* ================================
LOAD ALL PROJECTS
================================ */

async function loadAllProjects(){

const container = document.getElementById("projectsContainer");

if(!container) return;

showLoader(container);

try{

const snapshot = await projectsRef
.orderBy("createdAt","desc")
.get();

container.innerHTML = "";

snapshot.forEach(doc => {

const project = doc.data();

const card = createProjectCard(project);

container.appendChild(card);

});

}catch(error){

console.error("Error loading projects:",error);

showError(container,"Failed to load projects");

}

}


/* ================================
CREATE PROJECT CARD
================================ */

function createProjectCard(project){

const card = document.createElement("div");

card.className = "project-card";

card.innerHTML = `

<img src="${project.image}" alt="${project.title}">

<div class="project-content">

<h3>${project.title}</h3>

<p>${project.description}</p>

<div class="project-links">

<a href="${project.liveLink}" target="_blank">Live</a>

<a href="${project.githubLink}" target="_blank">Code</a>

</div>

</div>

`;

return card;

}


/* ================================
INITIALIZE PROJECTS
================================ */

document.addEventListener("DOMContentLoaded", () => {

loadFeaturedProjects();

loadAllProjects();

});