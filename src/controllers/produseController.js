const Produs = require("../schemas/Produse");
const fs = require("fs");
const path = require("path");

const handlePostProduse = async (req, res) => {
  const nume = req.body.nume;
  const descriere = req.body.descriere;
  const gramaj = req.body.gramaj;
  const pret = req.body.pret;

  console.log(nume);
  if (nume === "") {
    res.send(400).json({ message: "name is required" });
  }

  try {
    const result = await Produs.create({
      nume: nume,
      descriere: descriere,
      gramaj: gramaj,
      pret: pret,
      poza: "",
    });

    console.log(result);

    res.status(201).json({ message: "Product added" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleGetProduse = async (req, res) => {
  try {
    const produse = await Produs.find({});

    res.send(produse);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (id) => {
  try {
    const produs = await Produs.findById(id);
    if (!produs) {
      return "Nu am gasit produsul";
    }
    return produs.nume;
  } catch (err) {
    console.log(err);
  }
};

const deletePhoto = async (imgName) => {
  const filePath = path.join(__dirname, "..", "uploads", imgName);
  if (fs.existsSync(filePath)) {
    try {
      await fs.unlink(filePath, (err) => {
        console.log(err);
      });
      console.log("Poza a fost stearsa");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Nu exista poza");
  }
};

const handleDeleteProdus = async (req, res) => {
  const id = req.params.id;

  try {
    console.log("ceva");
    const nume = await getProductById(id);

    await deletePhoto(nume + ".jpg");
    //console.log("ceva");
    await Produs.deleteOne({ _id: id });
    //console.log("ceva");
    res.status(200).json({ message: "Produs sters" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

module.exports = { handlePostProduse, handleGetProduse, handleDeleteProdus };
