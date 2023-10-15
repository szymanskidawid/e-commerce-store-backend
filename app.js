const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: "*"
}));

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("connected to MongoDB");
})
.catch((error) => {
  console.log("error connecting to MongoDB", error);
})

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  stock: Number
})

const Products = mongoose.model("products", productSchema);

app.get('/', async (req, res) => {
  const data = await Products.find({});

  console.log(data);

  res.json(data);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});