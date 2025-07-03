const Request = require('../models/Request');

// ✅ POST /api/requests - Submit a new subject withdrawal request
const createRequest = async (req, res) => {
  try {
    const { subject, reason } = req.body;

    if (!subject || !reason) {
      return res.status(400).json({ message: 'Subject and reason are required.' });
    }

    const newRequest = new Request({
      subject,
      reason,
      user: req.user._id, // Provided by authenticateUser middleware
    });

    await newRequest.save();

    return res.status(201).json({
      message: 'Withdrawal request submitted successfully.',
      request: newRequest,
    });
  } catch (error) {
    console.error("❌ Error in createRequest:", error);
    return res.status(500).json({ message: 'Server error while submitting request.' });
  }
};

// ✅ GET /api/requests/my - Get all withdrawal requests of the logged-in user
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (error) {
    console.error("❌ Error in getMyRequests:", error);
    return res.status(500).json({ message: 'Server error while fetching your requests.' });
  }
};

// ✅ GET /api/requests/admin/pending - Admin: Get all pending requests
const getPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await Request.find({ status: { $in: ['Pending', null] } })
      .populate('user', 'name email'); // Make sure your model has 'user' field, not 'userId'

    return res.status(200).json(pendingRequests);
  } catch (error) {
    console.error("❌ Error in getPendingRequests:", error);
    return res.status(500).json({ message: 'Server error while fetching pending requests.' });
  }
};

// ✅ PUT /api/requests/:id/status - Admin: Update request status
const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value. Must be "Approved" or "Rejected".' });
  }

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    request.status = status;
    await request.save();

    return res.status(200).json({
      message: `Request has been ${status.toLowerCase()}.`,
      request,
    });
  } catch (error) {
    console.error("❌ Error in updateRequestStatus:", error);
    return res.status(500).json({ message: 'Server error while updating request status.' });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getPendingRequests,
  updateRequestStatus,
};
