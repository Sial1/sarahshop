const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Department = require("../models/department");
const Category = require("../models/category");
const Review = require("../models/review");

router.post("/product/create", async (req, res) => {
  try {
    const test = await Product.findOne({
      title: req.body.title
    });
    if (test) {
      return res.status(400).json({ error: "product already exists" });
    } else {
      const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.id
      });
      await newProduct.save();
      res.json({ message: "Product created" });
    }
  } catch (error) {
    res.status(400).json({ error: { message: "An error occurred" } });
  }
});

const createFilters = req => {
  const filters = {};
  if (req.query.priceMin) {
    filters.price = {};
    filters.price.$gte = req.query.priceMin;
  }
  if (req.query.priceMax) {
    if (filters.price === undefined) {
      filters.price = {};
    }
    filters.price.$lte = req.query.priceMax;
  }
  if (req.query.category) {
    filters.category = req.query.category;
  }
  if (req.query.title) {
    filters.title = new RegExp(req.query.title, "i");
  }
  return filters;
};
router.get("/product", async (req, res) => {
  try {
    const filters = createFilters(req);

    // Ici, nous construisons notre recherche
    const search = Product.find(filters).populate("reviews");
    if (req.query.sort === "rating-asc") {
      search.sort({ averageRating: 1 });
    } else if (req.query.sort === "rating-desc") {
      search.sort({ averageRating: -1 });
    } else if (req.query.sort === "price-asc") {
      // Ici, nous continuons de construire notre recherche
      search.sort({ price: 1 });
    } else if (req.query.sort === "price-desc") {
      // Ici, nous continuons de construire notre recherche
      search.sort({ price: -1 });
    }

    // Si la page est précisée
    if (req.query.page) {
      const page = req.query.page;
      const limit = 2; // 2 résultats par page

      search.limit(limit); // Limit à X résultats
      search.skip(limit * (page - 1)); // Ignorer X résultats
      // skip doit etre à 0 pour la premiere page
    }

    if (req.query.sort === "price-asc") {
      // Ici, nous continuons de construire notre recherche
      search.sort({ price: 1 });
    } else if (req.query.sort === "price-desc") {
      // Ici, nous continuons de construire notre recherche
      search.sort({ price: -1 });
    }

    // if (req.query.priceMin) {
    //   // ...
    // }

    // Ici, nous executons la recherche
    const products = await search;

    res.json(products);
  } catch (error) {
    res.status(400).json({ error: { message: "An error occurred" } });
  }
});

router.post("/product/update", async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (product !== null) {
      product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.id
      };
      await product.save();
      res.json({ message: "Product Updated" });
    } else {
      res.status(400).json({
        error: {
          message: "Product requested does not exist"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: { message: " An error occurred" }
    });
  }
});

router.post("/product/delete", async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (product) {
      await product.remove();
      let toto = product.reviews;

      for (let i = 0; i < toto.length; i++) {
        const reviews = await Review.findById(toto[i]);
        await reviews.remove();
      }
      res.json({ message: "Product deleted" });
    } else {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
