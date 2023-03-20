const express = require("express");
const router = express.Router();

const produse = [
  {
    id: 1,
    nume: "Product 1",
    descriere: "Description 1",
    pret: 10.99,
    gramaj: "200g",
    img: "https://www.w3schools.com/images/w3schools_green.jpg",
    alt: " ",
  },
  {
    id: 2,
    nume: "Product 2",
    descriere: "Description 2",
    pret: 19.99,
    gramaj: "250g",
    img: "https://www.w3schools.com/images/w3schools_green.jpg",
    alt: " ",
  },
  {
    id: 3,
    nume: "Product 3",
    descriere: "Description 3",
    pret: 5.99,
    gramaj: "300g",
    img: "https://www.w3schools.com/images/w3schools_green.jpg",
    alt: " ",
  },
];

router.get("/produse", (req, res) => {
  console.log("handling GET route");
  res.send(produse);
});

module.exports = router;
