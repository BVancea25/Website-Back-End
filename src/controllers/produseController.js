const Produs = require("../schemas/Produse");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

const handleDeleteProdus = async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);
  try {
    const produs = await Produs.findById(objectId, (err, produs) => {
      if (err) {
        cpnsole.log(err);
        return;
      }
    });
    console.log(produs.nume);

    await Produs.deleteOne({ _id: id });

    res.status(200).json({ message: "Produs sters" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

module.exports = { handlePostProduse, handleGetProduse, handleDeleteProdus };
