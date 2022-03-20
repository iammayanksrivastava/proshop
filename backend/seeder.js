const mongoose = require("mongoose");
const colors = require("colors");

//Data
const users = require("./data/users");
const products = require("./data/dummy.js");

//Models
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");



mongoose
  .connect("mongodb+srv://mayank:residency18@cluster0.f2t3i.mongodb.net/proshop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed...".red.inverse);
  } catch (error) {
    console.log(error);
  }
};


if (process.argv[2] ==='-d') {
  destroyData();
} else {
    importData();
}