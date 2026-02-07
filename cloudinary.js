
const apikey='858826627119291'
const secretKey='87xBqxdmo7eQoR2_GlXaB1003tU'

const url = 'https://api.cloudinary.com/v1_1/dplhoc2lf/image/upload';

export async function addPhoto(formData) {
  console.log(formData,"real form data");
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const secureUrl = data.secure_url; // Get the secure URL of the uploaded image
    console.log(data,"data");
    
    return secureUrl;   // <-- image info yahan se milega
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
  }
}

    
    