import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

mongoose
  .connect("mongodb://localhost:27017/productDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  const productSchema = new mongoose.Schema({
    productName: String,
    phone: String,
    email: String,
    price: Number,
    quantity: Number,
    category: String,
    productDetails: String,
    images: [String],
    startDate: Date, // ✅ Ensure these fields exist in the schema
    endDate: Date,
    totalAvailableDays: Number,
    perDayPrice: Number, // Ensure this field exists
    perWeekPrice: Number, 
    Address: String,
    Username: String,
    
  });

const Product = mongoose.model("Product", productSchema);

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/products", upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files?.map((file) => file.path.replace(/\\/g, "/")) || [];
    const { startDate, endDate, totalAvailableDays, perDayPrice, perWeekPrice, ...otherData } = req.body;

    const newProduct = new Product({
      ...otherData,
      images: imagePaths,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      totalAvailableDays: totalAvailableDays ? Number(totalAvailableDays) : 0,
      perDayPrice: perDayPrice ? Number(perDayPrice) : 0, // Ensure this field is parsed and saved
      perWeekPrice: perWeekPrice ? Number(perWeekPrice) : 0, // Ensure this field is parsed and saved
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error in /api/products:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});


app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedProduct = {
        ...product._doc,
        images: product.images.map((img) => img.replace(/\\/g, "/")), // Fix path
    };

    console.log("Product Response:", updatedProduct); // Debugging
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const products = await Product.find();

    const updatedProducts = products.map((product) => ({
      ...product._doc,
      images: product.images.map((img) => img.replace(/\\/g, "/")), // Fix path
    }));

    res.json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/api/images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ message: "Error fetching images" });
    }
    const imagePaths = files.map(file => `uploads/${file}`);
    res.json(imagePaths);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
