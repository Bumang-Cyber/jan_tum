const bgImage = document.createElement("img");
const images = [
  "0.jpeg",
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpg",
  "6.jpg",
];
const chosenImage = images[Math.floor(Math.random() * images.length)];

bgImage.src = "sunnyAfternoon.jpg";

bgImage.src = `./images/${chosenImage}`;
document.body.appendChild(bgImage);
