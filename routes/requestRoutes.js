const express = require('express');
const router = express.Router();
const { createRequest, getMyRequests,getPendingRequests,updateRequestStatus } = require('../controllers/requestController');
const { protect,adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createRequest);
router.get('/my', protect, getMyRequests);
router.get('/admin/pending',adminOnly, getPendingRequests);
router.patch('/admin/:id',adminOnly,updateRequestStatus);

module.exports = router;
