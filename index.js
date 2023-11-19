const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000; // Choose a different port than the log ingestor

// Connect to MongoDB (Assuming you have a MongoDB instance running on the default port)
mongoose.connect('mongodb://localhost:27017/logs', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Log Schema (Same as log ingestor)
const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

// Create Log Model
const Log = mongoose.model('Log', logSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Define API endpoints for querying logs
app.get('/logs', async (req, res) => {
  try {
    const query = req.query;

    // Build MongoDB query based on provided parameters
    const mongoQuery = {};
    if (query.level) mongoQuery.level = query.level;
    if (query.message) mongoQuery.message = { $regex: query.message, $options: 'i' }; // Case-insensitive regex
    if (query.resourceId) mongoQuery.resourceId = query.resourceId;
    if (query.timestamp) mongoQuery.timestamp = {
      $gte: new Date(query.timestamp.start),
      $lte: new Date(query.timestamp.end),
    };
    if (query.traceId) mongoQuery.traceId = query.traceId;
    if (query.spanId) mongoQuery.spanId = query.spanId;
    if (query.commit) mongoQuery.commit = query.commit;
    if (query['metadata.parentResourceId']) mongoQuery['metadata.parentResourceId'] = query['metadata.parentResourceId'];

    const logs = await Log.find(mongoQuery);
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Query Interface listening on port ${PORT}`);
});
