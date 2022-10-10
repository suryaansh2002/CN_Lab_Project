const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://suryaanshr:suryaanshr@cluster0.fwqwrgr.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
