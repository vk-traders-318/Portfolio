/* ================================
LOAD LATEST BLOGS (INDEX PAGE)
================================ */

async function loadLatestBlogs(){

const container = document.getElementById("latestBlogs");

if(!container) return;

showLoader(container);

try{

const snapshot = await blogsRef
.orderBy("createdAt","desc")
.limit(3)
.get();

container.innerHTML = "";

snapshot.forEach(doc => {

const blog = doc.data();

const card = createBlogCard(blog);

container.appendChild(card);

});

}catch(error){

console.error("Error loading blogs:",error);

showError(container,"Failed to load blogs");

}

}


/* ================================
LOAD ALL BLOGS (BLOG PAGE)
================================ */

async function loadAllBlogs(){

const container = document.getElementById("blogContainer");

if(!container) return;

showLoader(container);

try{

const snapshot = await blogsRef
.orderBy("createdAt","desc")
.get();

container.innerHTML = "";

snapshot.forEach(doc => {

const blog = doc.data();

const card = createBlogCard(blog);

container.appendChild(card);

});

}catch(error){

console.error("Blog load error:",error);

showError(container,"Failed to load blogs");

}

}


/* ================================
CREATE BLOG CARD
================================ */

function createBlogCard(blog){

const card = document.createElement("div");

card.className = "blog-card";

card.innerHTML = `

<img src="${blog.coverImage}" alt="${blog.title}">

<div class="blog-content">

<h3>${blog.title}</h3>

<p>${blog.excerpt || ""}</p>

</div>

`;

return card;

}


/* ================================
INITIALIZE BLOG SYSTEM
================================ */

document.addEventListener("DOMContentLoaded", () => {

loadLatestBlogs();

loadAllBlogs();

});