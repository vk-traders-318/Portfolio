/* ================================
CHECK ADMIN AUTH
================================ */

checkAdminAuth();


/* ================================
ELEMENTS
================================ */

const addBlogBtn = document.getElementById("addBlogBtn");
const blogFormContainer = document.getElementById("blogFormContainer");
const blogForm = document.getElementById("blogForm");
const blogsTable = document.getElementById("blogsTable");


/* ================================
TOGGLE BLOG FORM
================================ */

if(addBlogBtn){

addBlogBtn.addEventListener("click", () => {

if(blogFormContainer.style.display === "none"){

blogFormContainer.style.display = "block";

}else{

blogFormContainer.style.display = "none";

}

});

}


/* ================================
LOAD BLOGS
================================ */

async function loadBlogs(){

try{

const snapshot = await blogsRef
.orderBy("createdAt","desc")
.get();

blogsTable.innerHTML = "";

snapshot.forEach(doc => {

const data = doc.data();
const id = doc.id;

const row = document.createElement("tr");

row.innerHTML = `

<td>${data.title}</td>

<td>${data.excerpt || ""}</td>

<td>

<button class="admin-btn btn-delete" onclick="deleteBlog('${id}')">
Delete
</button>

</td>

`;

blogsTable.appendChild(row);

});

}catch(error){

console.error("Blog load error:",error);

}

}


/* ================================
ADD BLOG
================================ */

blogForm.addEventListener("submit", async (e) => {

e.preventDefault();

const title = document.getElementById("blogTitle").value.trim();
const excerpt = document.getElementById("blogExcerpt").value.trim();
const content = document.getElementById("blogContent").value.trim();

let imageUrl = "";

try{

/* IMAGE UPLOAD */

const imageInput = document.getElementById("blogImage");

if(imageInput.files.length > 0){

imageUrl = await uploadImageToCloudinary(imageInput.files[0]);

}

/* SAVE BLOG */

await blogsRef.add({

title: title,
excerpt: excerpt,
content: content,
coverImage: imageUrl,
createdAt: firebase.firestore.FieldValue.serverTimestamp()

});

blogForm.reset();

blogFormContainer.style.display = "none";

loadBlogs();

}catch(error){

console.error("Blog add error:",error);

}

});


/* ================================
DELETE BLOG
================================ */

async function deleteBlog(id){

const confirmDelete = confirm("Delete this blog?");

if(!confirmDelete) return;

try{

await blogsRef.doc(id).delete();

loadBlogs();

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

loadBlogs();

});