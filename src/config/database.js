const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://rajeshreddy:9eMCl4rMvvH5vC6s@namasthenode.rfc90a7.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
