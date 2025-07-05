const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

// ✅ Make sure only ONE listen call is used
const MONGO_URI = "mongodb+srv://maria:withdrawal@cluster0.f2tnj28.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
