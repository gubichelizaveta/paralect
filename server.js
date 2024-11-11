const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const jobRoutes = require('./routes/jobRoutes');

app.use(cors());
app.use(express.json());

app.use(jobRoutes);

mongoose.connect("mongodb://autorack.proxy.rlwy.net:11058")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
