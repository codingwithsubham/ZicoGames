const mongoose = require("mongoose");
const { MONGO_URI_CLOUD } = require("../common/constant/constants");

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URI_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB Connected..");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
