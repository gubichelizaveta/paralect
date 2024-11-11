const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  salaryRange: String,
  status: String,
  note: String,
});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;
