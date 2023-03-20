const cors = require("cors");

const whiteList = ["http://localhost:3000", "http://localhost:3500", "*"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed ba "));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(corsOptions);
