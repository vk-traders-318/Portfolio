/* ================================
CHECK ADMIN AUTH
================================ */

checkAdminAuth();


/* ================================
ELEMENTS
================================ */

const profileForm = document.getElementById("profileForm");


/* ================================
LOAD PROFILE
================================ */

async function loadProfile(){

try{

const doc = await profileRef.doc("main").get();

if(!doc.exists) return;

const data = doc.data();

document.getElementById("profileName").value = data.name || "";
document.getElementById("profileBio").value = data.bio || "";

document.getElementById("profileSkills").value =
(data.skills || []).join(",");

document.getElementById("githubLink").value = data.github || "";
document.getElementById("instagramLink").value = data.instagram || "";
document.getElementById("linkedinLink").value = data.linkedin || "";

}catch(error){

console.error("Profile load error:",error);

}

}


/* ================================
SAVE PROFILE
================================ */

profileForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = document.getElementById("profileName").value.trim();
const bio = document.getElementById("profileBio").value.trim();

const skillsInput = document.getElementById("profileSkills").value.trim();

const github = document.getElementById("githubLink").value.trim();
const instagram = document.getElementById("instagramLink").value.trim();
const linkedin = document.getElementById("linkedinLink").value.trim();


/* CONVERT SKILLS */

const skills = skillsInput.split(",").map(skill => skill.trim());


let imageUrl = "";

try{

/* IMAGE UPLOAD */

const imageInput = document.getElementById("profileImage");

if(imageInput.files.length > 0){

imageUrl = await uploadImageToCloudinary(imageInput.files[0]);

}


/* SAVE DATA */

await profileRef.doc("main").set({

name: name,
bio: bio,
skills: skills,
github: github,
instagram: instagram,
linkedin: linkedin,
image: imageUrl

});

alert("Profile updated");

}catch(error){

console.error("Profile update error:",error);

}

});


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

loadProfile();

});