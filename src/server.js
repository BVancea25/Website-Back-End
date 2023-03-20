const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const Cors = require("./midleware/Cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const { logger } = require("./midleware/Logger");
const registerController = require("./controllers/signController");
const loginController = require("./controllers/loginController");
const handleProduse = require("./controllers/produseController");
const handleRefresh = require("./controllers/refreshTokenController");
const handleLogout = require("./controllers/logoutController");

const verifyJWT = require("./midleware/verifyJWT");
const cookieParser = require("cookie-parser");
const upload = require("./midleware/Multer");

app.use(logger);

connectDB();

app.use(Cors);

app.use(express.json());

app.use(express.static("uploads"));

app.use(cookieParser());

app.options("/signin", Cors);

//app.get("/produse", handleProduse.handleGetProduse);

app.post("/signin", registerController.handleNewUser);

app.post("/login", loginController.handleLogin);

app.get("/refresh", handleRefresh.handleRefresh);

app.get("/logout", handleLogout.handleLogout);

//app.use(verifyJWT);
app.get("/produse", handleProduse.handleGetProduse);

app.delete("/produse/:id", handleProduse.handleDeleteProdus);

app.post("/produse", upload.single("image"), handleProduse.handlePostProduse);

app.get("/locatii", (req, res) => {
  res.send({ locatii });
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => console.log("Server running on port " + PORT));
});
