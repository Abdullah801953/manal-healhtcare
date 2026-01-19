// Run this script to add image field to all doctors in data.ts
// node add-images-to-doctors.js

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'app/doctors/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Images to cycle through
const images = [
  '/doctor.png',
  '/doctor-img 1.png',
  '/doctor-img2 1.png'
];

let imageIndex = 0;

// Add image field after hospital field for each doctor
content = content.replace(
  /(hospital: "[^"]+",)\n/g,
  (match) => {
    const imageToAdd = images[imageIndex % images.length];
    imageIndex++;
    return `${match}    image: "${imageToAdd}",\n`;
  }
);

fs.writeFileSync(dataPath, content, 'utf8');
console.log('✅ Added image fields to all doctors!');
