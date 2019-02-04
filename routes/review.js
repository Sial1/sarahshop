const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Review = require("../models/review");

const calculateRating = product => {
  if (product.reviews.length === 0) {
    return 0;
  }

  let rating = 0;
  for (let i = 0; i < product.reviews.length; i++) {
    rating = rating + product.reviews[i].rating;
  }
  rating = rating / product.reviews.length;
  rating = Number(rating.toFixed(1));
  return rating;
};

router.post("/review/update", async (req, res) => {
  try {
    // Modifier l'avis ayant l'id req.query.id
    const review1 = await Review.findById(req.query.id);
    if (review) {
      review.comment = req.body.comment;
      review.rating = req.body.rating;
      await review.save();

      // Chercher un produit associé à un ou plusieurs avis
      const product = await Product.findOne({
        reviews: { $in: [req.query.id] }
      }).populate("reviews");

      // Mettre à jour la note moyenne
      const rating = calculateRating(product);
      product.averageRating = rating;

      await product.save();
      res.json(review);
    } else {
      res.status(400).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/review/create", async (req, res) => {
  try {
    const product = await Product.findById(req.body.product).populate(
      "reviews"
    );
    if (product) {
      if (product.reviews === undefined) {
        Product.reviews = [];
      }

      // const product = await Product.findById(req.body.id);
      const review = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
        username: req.body.username
      });

      await review.save();

      product.reviews.push(review);
      //res.json({ message: "Review created" });

      const rating = calculateRating(product);
      product.averageRating = rating;
      await product.save();
      res.json(review);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/review/delete", async (req, res) => {
  try {
    const review = await Review.findById(req.body.id);
    if (review) {
      Product.findOne({ reviews: { $in: [req.query.id] } });
      await review.remove();
      res.json({ message: "Review deleted" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
