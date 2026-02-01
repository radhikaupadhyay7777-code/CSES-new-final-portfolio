const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String },
  year: { type: String },
  branch: { type: String },
  email: { type: String, required: true },
  contact: { type: String, required: true },

  // ✅ NEW FIELD
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 100, // safety limit (words validated in route)
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);
