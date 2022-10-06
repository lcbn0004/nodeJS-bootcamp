const express = require('express');
const {
  checkID,
  checkBody,
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../part7-controller/tourController');

const router = express.Router();

router.param('id', checkID)

router.route('/').get(getAllTour).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
