const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/ai_models"; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a Mongoose schema and model
const modelSchema = new mongoose.Schema({
  model_name: String,
  max_tokens: Number,
  max_input_tokens: Number,
  max_output_tokens: Number,
  input_cost_per_token: Number,
  output_cost_per_token: Number,
  litellm_provider: String,
  mode: String,
  supports_function_calling: Boolean,
  supports_parallel_function_calling: Boolean,
  supports_vision: Boolean,
});

const Model = mongoose.model("Model", modelSchema);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET /models - Retrieve all models with filtering
app.get("/models", async (req, res) => {
  try {
    const filters = {};

    // Build filters from query parameters
    Object.entries(req.query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        // Convert string to boolean if needed
        if (value === "true") value = true;
        if (value === "false") value = false;
        // Check if value is a number
        const numberValue = Number(value);

        if (key === "model_name") {
          // Use a case-insensitive regular expression for partial matching
          filters[key] = new RegExp(value, "i");
        } else {
          filters[key] = isNaN(numberValue) ? value : numberValue;
        }
      }
    });

    const models =
      Object.keys(filters).length > 0
        ? await Model.find(filters)
        : await Model.find({});
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
