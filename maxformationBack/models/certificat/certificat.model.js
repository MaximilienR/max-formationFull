const mongoose = require("mongoose");

const certificatSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Certificat", certificatSchema);
