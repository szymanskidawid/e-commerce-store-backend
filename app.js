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
  _id: String,
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

app.put('/restock', async (req, res) => {
  try {
    await Products.updateMany({}, { stock: 10 });

    res.json({ message: "stock refill successfull" });
  }

  catch(err) {
    console.log(err);
    res.status(500).json({ error: "stock refill unsuccessful"});
  }
})

app.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Products.findByIdAndUpdate({_id: productId}, {stock: req.body.stock});

    res.json({ message: "product modified successfully" });
  }

  catch(err) {
    console.log(err);
    res.status(500).json({ error: "stock reduction unsuccessful"});
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});