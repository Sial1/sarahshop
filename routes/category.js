const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Department = require("../models/department");
const Category = require("../models/category");

router.post("/category/create", async (req, res) => {
  try {
    const test = await Category.findOne({
      title: req.body.title
    });
    if (test) {
      return res.status(400).json({ error: "Category already exists" });
    } else {
      const newCategory = new Category({
        title: req.body.title,
        description: req.body.description,
        department: req.body.id
      });

      await newCategory.save();
      res.json({ message: "Category created" });
    }
  } catch (error) {
    res.status(400).json({ error: { message: "An error occurred" } });
  }
});

router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find().populate("department");
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: { message: "An error occurred" } });
  }
});

router.post("/category/update", async (req, res) => {
  try {
    const category = await Category.findById(req.body.id);

    if (category !== null) {
      category = {
        title: req.body.title,
        description: req.body.description,
        department: req.body.id
      };
      await category.save();
      res.json({ message: "Category Updated" });
    } else {
      res.status(400).json({
        error: {
          message: "Category requested does not exist"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: { message: " An error occurred" }
    });
  }
});

router.post("/category/delete", async (req, res) => {
  try {
    const category = await Category.findById(req.body.id);
    if (category) {
      await category.remove();

      const products = await Product.find({
        category: req.query.id
      });
      for (let i = 0; i < products.length; i++) {
        await products[i].remove();
      }

      res.json({ message: "Category removed" });
    } else {
      res.status(400).json({
        messgae: "Category not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;
