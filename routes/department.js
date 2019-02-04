const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Department = require("../models/department");
const Category = require("../models/category");

router.post("/department/create", async (req, res) => {
  try {
    const test = await Department.findOne({
      title: req.body.title
    });
    if (test) {
      return res.status(400).json({ error: "Department already exists" });
    } else {
      const newDepartment = new Department({
        title: req.body.title
      });

      await newDepartment.save();
      res.json({ message: "Department created" });
    }
  } catch (error) {
    res.status(400).json({ error: { message: "An error occurred" } });
  }
});

router.get("/department", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(400).json({ error: { message: "An error occurred" } });
  }
});

router.post("/department/update", async (req, res) => {
  try {
    const department = await Department.findById(req.body.id);
    if (department !== null) {
      department.title = req.body.title;
      await department.save();
      res.json({ message: "Department Updated" });
    } else {
      res.status(400).json({
        error: {
          message: "Department requested does not exist"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: { message: " An error occurred" }
    });
  }
});

router.post("/department/delete", async (req, res) => {
  try {
    const department = await Department.findById(req.body.id);
    if (department) {
      await department.remove();
      const categories = await Category.find({
        department: req.query.id
      });
      for (let i = 0; i < categories.length; i++) {
        await categories[i].remove();
      }

      res.json({ message: "Department removed" });
    } else {
      res.status(400).json({
        messgae: "Department not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;
