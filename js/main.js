/* ================================
MOBILE NAVBAR TOGGLE
================================ */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.querySelector(".nav-links");

if(menuToggle){

menuToggle.addEventListener("click", () => {

navLinks.classList.toggle("active");

});

}


/* ================================
LOAD PROFILE DATA
================================ */

async function loadProfile(){

try{

const doc = await profileRef.doc("main").get();

if(!doc.exists){

console.log("Profile not found");

return;

}

const data = doc.data();


/* PROFILE NAME */

const heroName = document.getElementById("heroName");

if(heroName){

heroName.textContent = `Hi, I'm ${data.name}`;

}


/* PROFILE BIO */

const heroBio = document.getElementById("heroBio");

if(heroBio){

heroBio.textContent = data.bio;

}


/* PROFILE IMAGE */

const profileImage = document.getElementById("profileImage");

if(profileImage){

profileImage.src = data.image;

}


/* SOCIAL LINKS */

const githubLink = document.getElementById("githubLink");

if(githubLink && data.github){

githubLink.href = data.github;

}

const instagramLink = document.getElementById("instagramLink");

if(instagramLink && data.instagram){

instagramLink.href = data.instagram;

}

const linkedinLink = document.getElementById("linkedinLink");

if(linkedinLink && data.linkedin){

linkedinLink.href = data.linkedin;

}


/* SKILLS */

loadSkills(data.skills);

}catch(error){

console.error("Profile load error:",error);

}

}


/* ================================
LOAD SKILLS
================================ */

function loadSkills(skills){

const container = document.getElementById("skillsContainer");

if(!container || !skills) return;

container.innerHTML = "";

skills.forEach(skill => {

const card = document.createElement("div");

card.className = "skill-card";

card.innerHTML = `

<h3>${skill}</h3>

<p>Experience building projects using ${skill}</p>

`;

container.appendChild(card);

});

}


/* ================================
STATS COUNTER
================================ */

async function loadStats(){

try{

const projectsSnapshot = await projectsRef.get();

const blogsSnapshot = await blogsRef.get();


const projectCount = document.getElementById("projectCount");

if(projectCount){

projectCount.textContent = projectsSnapshot.size;

}

const websiteCount = document.getElementById("websiteCount");

if(websiteCount){

websiteCount.textContent = projectsSnapshot.size;

}

}catch(error){

console.error("Stats error:",error);

}

}


/* ================================
INITIALIZE PAGE
================================ */

document.addEventListener("DOMContentLoaded", () => {

loadProfile();

loadStats();

});