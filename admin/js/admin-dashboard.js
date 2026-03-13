/* ================================
CHECK ADMIN AUTH
================================ */

checkAdminAuth();


/* ================================
LOAD DASHBOARD STATS
================================ */

async function loadDashboardStats(){

try{

/* PROJECTS COUNT */

const projectsSnapshot = await projectsRef.get();

const totalProjects = document.getElementById("totalProjects");

if(totalProjects){

totalProjects.textContent = projectsSnapshot.size;

}


/* BLOGS COUNT */

const blogsSnapshot = await blogsRef.get();

const totalBlogs = document.getElementById("totalBlogs");

if(totalBlogs){

totalBlogs.textContent = blogsSnapshot.size;

}


/* MESSAGES COUNT */

const messagesSnapshot = await messagesRef.get();

const totalMessages = document.getElementById("totalMessages");

if(totalMessages){

totalMessages.textContent = messagesSnapshot.size;

}

}catch(error){

console.error("Dashboard stats error:",error);

}

}


/* ================================
LOGOUT SYSTEM
================================ */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click", async () => {

try{

await auth.signOut();

window.location.href = "login.html";

}catch(error){

console.error("Logout error:",error);

}

});

}


/* ================================
INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", () => {

loadDashboardStats();

});