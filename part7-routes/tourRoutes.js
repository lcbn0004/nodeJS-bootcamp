const express = require('express');
const {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../part7-controller/tourController');

const router = express.Router();
router.route('/').get(getAllTour).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
