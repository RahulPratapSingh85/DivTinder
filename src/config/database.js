const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteDev:pGLWWSiNFmk47En9@namastedev.jwmbvds.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
