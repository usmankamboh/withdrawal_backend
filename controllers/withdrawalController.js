// const WithdrawalRequest = require('../models/WithdrawalRequest');

// const submitWithdrawalRequest = async (req, res) => {
//   try {
//     const { subjectName, reason } = req.body;
//     const userId = req.user.id;

//     const newRequest = new WithdrawalRequest({
//       userId,
//       subjectName,
//       reason
//     });

//     await newRequest.save();

//     res.status(201).json({ message: 'Request submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error while submitting request' });
//   }
// };

// module.exports = {
//   submitWithdrawalRequest
// };


// controllers/withdrawalController.js

const WithdrawalRequest = require('../models/WithdrawalRequest');

// Admin: Get all pending requests
const getPendingRequests = async (req, res) => {
  try {
    const pending = await WithdrawalRequest.find({ status: { $in: ['Pending', null] } }).populate('userId', 'email name');
    res.status(200).json(pending);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pending requests' });
  }
};

// Admin: Update status (approve/reject)
const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const request = await WithdrawalRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    await request.save();
    res.status(200).json({ message: `Request ${status.toLowerCase()}`, request });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request status' });
  }
};

module.exports = {
  getPendingRequests,
  updateRequestStatus
};
