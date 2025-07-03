const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

// ✅ Make sure only ONE listen call is used
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
