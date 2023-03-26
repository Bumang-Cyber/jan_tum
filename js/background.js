const bgImage = document.createElement("img");
const images = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpg",
  "6.jpg",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpeg",
  "21.jpeg",
  "22.jpeg",
];
const chosenImage = images[Math.floor(Math.random() * images.length)];

bgImage.src = `./images/${chosenImage}`;
bgImage.classList.add("bgImage");
document.body.appendChild(bgImage);
