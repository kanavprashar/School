const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// MongoDB connection string for MongoDB Compass
const uri = "mongodb://localhost:27017/schoolDB";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Schema and Model
const enrollmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  courses: [String],
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// Route to handle form submission
app.post("/api/enroll", async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json({ message: "Enrollment successful!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to enroll." });
  }
});

app.listen(5111, () => {
  console.log("Server running on port 5111");
});
