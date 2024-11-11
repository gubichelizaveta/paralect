const express = require('express');
const Job = require('../models/job'); 
const router = express.Router();


router.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


router.post('/api/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});


router.put('/api/jobs/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});


router.delete('/api/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'вакансия удалена' });
});

module.exports = router;
