const express = require('express');
const router = express.Router();
const {
  getPendingRequests,
  updateRequestStatus
} = require('../controllers/withdrawalController');

const {
  authenticateUser,
  adminOnly
} = require('../middleware/authMiddleware');

router.get('/pending', authenticateUser, adminOnly, getPendingRequests);
router.patch('/:id', authenticateUser, adminOnly, updateRequestStatus);

module.exports = router;
