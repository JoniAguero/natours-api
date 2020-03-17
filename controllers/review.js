const Review = require('../models/review.model');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review);

exports.getReviewById = factory.getById(Review);

exports.createReview = factory.create(Review);

exports.deleteReview = factory.delete(Review);

exports.updateReview = factory.update(Review);

exports.setTourUsersId = (req,res,next) => {

  // Allow nested routes

  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;

  next();
  
}
