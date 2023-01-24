const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    contract: { type: String, required: true },
    position: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const JobsModel = mongoose.model("jobs", JobsSchema);

module.exports = JobsModel;
