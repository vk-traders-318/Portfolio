/* ================================
CLOUDINARY CONFIG
================================ */

const CLOUDINARY_CLOUD_NAME = "dlcl0dzsf";
const CLOUDINARY_UPLOAD_PRESET = "portfolio_upload";


/* ================================
UPLOAD IMAGE FUNCTION
================================ */

async function uploadImageToCloudinary(file){

if(!file){

throw new Error("No file selected");

}

const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const formData = new FormData();

formData.append("file",file);
formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);

try{

const response = await fetch(url,{

method:"POST",
body:formData

});

const data = await response.json();

if(!response.ok){

throw new Error(data.error.message);

}

return data.secure_url;

}catch(error){

console.error("Cloudinary upload error:",error);

throw error;

}

}


/* ================================
UPLOAD WITH PREVIEW
================================ */

async function uploadImageWithPreview(fileInput,previewImg){

const file = fileInput.files[0];

if(!file) return null;

try{

/* show preview */

if(previewImg){

previewImg.src = URL.createObjectURL(file);

}

/* upload to cloudinary */

const imageUrl = await uploadImageToCloudinary(file);

return imageUrl;

}catch(error){

alert("Image upload failed");

return null;

}

}