// server.js

// 1️⃣ Required Packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// 2️⃣ App Initialization
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 3️⃣ Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// 4️⃣ Check ENV
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not set in .env");
  process.exit(1);
}

// 5️⃣ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("Mongo URI:", process.env.MONGO_URI);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 6️⃣ Contact Schema & Model
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Collection name: 'contacts'
const Contact = mongoose.model("Contact", ContactSchema, "contact-details");

// 7️⃣ Hire Me Schema & Model
const HireMeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  service: String,
  budget: String,
  timeline: String,
  message: String,
  contactMethod: String,
  createdAt: { type: Date, default: Date.now }
});

// Collection name: 'hiremes'
const HireMe = mongoose.model("HireMe", HireMeSchema, "hiremes");

// 8️⃣ Contact Form Route
app.post("/api/contact", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received Contact form data:", formData);

    const newContact = new Contact(formData);
    const savedContact = await newContact.save();
    console.log("Contact saved to MongoDB:", savedContact);

    res.status(200).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// 9️⃣ Hire Me Form Route
app.post("/api/hireme", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received Hire Me form data:", formData);

    const newHireMe = new HireMe(formData);
    const savedHireMe = await newHireMe.save();
    console.log("Hire Me saved to MongoDB:", savedHireMe);

    res.status(200).json({ message: "Hire Me form submitted successfully!" });
  } catch (error) {
    console.error("Hire Me form error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// 🔟 Default Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running!");
});

// 1️⃣1️⃣ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
