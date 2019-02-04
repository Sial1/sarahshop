const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const departmentRoutes = require("./routes/department");

const categoryRoutes = require("./routes/category");

const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sarahshop", {
  useMongoClient: true
});

const Product = require("./models/product");
const Department = require("./models/department");
const Category = require("./models/category");
const Review = require("./models/review");

app.use(departmentRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(reviewRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

// const Department = mongoose.model("Department", {
//   title: {
//     type: String,
//     default: ""
//   }
// });

// const Category = mongoose.model("Category", {
//   title: {
//     type: String,
//     default: ""
//   },
//   description: {
//     type: String,
//     default: ""
//   },
//   department: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Department"
//   }
// });

// const Product = mongoose.model("Product", {
//   title: {
//     type: String,
//     default: ""
//   },
//   description: {
//     type: String,
//     default: ""
//   },
//   price: {
//     type: Number
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category"
//   }
// });

// app.post("/department/create", async (req, res) => {
//   try {
//     const test = await Department.findOne({
//       title: req.body.title
//     });
//     if (test) {
//       return res.status(400).json({ error: "Department already exists" });
//     } else {
//       const newDepartment = new Department({
//         title: req.body.title
//       });

//       await newDepartment.save();
//       res.json({ message: "Department created" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: { message: "An error occurred" } });
//   }
// });

// app.get("/department", async (req, res) => {
//   try {
//     const departments = await Department.find();
//     res.json(departments);
//   } catch (error) {
//     res.status(400).json({ error: { message: "An error occurred" } });
//   }
// });

// app.post("/department/update", async (req, res) => {
//   try {
//     const department = await Department.findById(req.body.id);
//     if (department !== null) {
//       department.title = req.body.title;
//       await department.save();
//       res.json({ message: "Department Updated" });
//     } else {
//       res.status(400).json({
//         error: {
//           message: "Department requested does not exist"
//         }
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: { message: " An error occurred" }
//     });
//   }
// });

// app.post("/department/delete", async (req, res) => {
//   try {
//     const department = await Department.findById(req.body.id);
//     if (department) {
//       await department.remove();
//       const categories = await Category.find({
//         department: req.query.id
//       });
//       for (let i = 0; i < categories.length; i++) {
//         await categories[i].remove();
//       }

//       res.json({ message: "Department removed" });
//     } else {
//       res.status(400).json({
//         messgae: "Department not found"
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     });
//   }
// });

//////////////////////////////////DELETE MISSING////////////////

// app.post("/category/create", async (req, res) => {
//   try {
//     const test = await Category.findOne({
//       title: req.body.title
//     });
//     if (test) {
//       return res.status(400).json({ error: "Category already exists" });
//     } else {
//       const newCategory = new Category({
//         title: req.body.title,
//         description: req.body.description,
//         department: req.body.id
//       });

//       await newCategory.save();
//       res.json({ message: "Category created" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: { message: "An error occurred" } });
//   }
// });

// app.get("/category", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(400).json({ error: { message: "An error occurred" } });
//   }
// });

// app.post("/category/update", async (req, res) => {
//   try {
//     const category = await Category.findById(req.body.id);
//     if (category !== null) {
//       category = {
//         title: req.body.title,
//         description: req.body.description,
//         department: req.body.id
//       };
//       await category.save();
//       res.json({ message: "Category Updated" });
//     } else {
//       res.status(400).json({
//         error: {
//           message: "Category requested does not exist"
//         }
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: { message: " An error occurred" }
//     });
//   }
// });

// app.post("/category/delete", async (req, res) => {
//   try {
//     const category = await Category.findById(req.body.id);
//     if (category) {
//       await category.remove();

//       const products = await Product.find({
//         category: req.query.id
//       });
//       for (let i = 0; i < products.length; i++) {
//         await products[i].remove();
//       }

//       res.json({ message: "Category removed" });
//     } else {
//       res.status(400).json({
//         messgae: "Category not found"
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message
//     });
//   }
// });

// //////////////////////delete missing//////////////
// app.post("/product/create", async (req, res) => {
//   try {
//     const test = await Product.findOne({
//       title: req.body.title
//     });
//     if (test) {
//       return res.status(400).json({ error: "product already exists" });
//     } else {
//       const newProduct = new Product({
//         title: req.body.title,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.id
//       });
//       await newProduct.save();
//       res.json({ message: "Product created" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: { message: "An error occurred" } });
//   }
// });

// const creatFilters = req => {
//   const filters = {};
//   if (req.query.priceMin) {
//     filters.price = {};
//     filters.price.$gte = req.query.priceMin;
//   }
//   if (req.query.priceMax) {
//     if (filters.price == undefined) {
//       filters.price = {};
//     }
//     filters.price.$lte = req.query.priceMax;
//   }
//   if (req.query.category) {
//     filters.category = req.query.category;
//   }
//   if (req.query.title) {
//     filters.title = new RegExp(req.query.title, "i");
//   }
//   return filters;
// };
// app.get("/product", async (req, res) => {
//   try {
//     const products = await Product.find(); //.sort({});
//     res.json(products);
//   } catch (error) {
//     res.status(400).json({ error: { message: "An error occurred" } });
//   }
// });

// app.post("/product/update", async (req, res) => {
//   try {
//     const product = await Product.findById(req.body.id);
//     if (product !== null) {
//       product = {
//         title: req.body.title,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.id
//       };
//       await product.save();
//       res.json({ message: "Product Updated" });
//     } else {
//       res.status(400).json({
//         error: {
//           message: "Product requested does not exist"
//         }
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: { message: " An error occurred" }
//     });
//   }
// });

// app.post("/product/delete", async (req, res) => {
//   try {
//     if (req.body.id && req.body.title) {
//       const product = await Product.findById(req.body.id);
//       await product.remove();
//       res.json({ message: "Product deleted" });
//     } else {
//       res.status(400).json({ message: "Missing id" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
