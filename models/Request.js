const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // You can later allow admin to update this
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
