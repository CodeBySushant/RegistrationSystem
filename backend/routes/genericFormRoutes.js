// backend/routes/genericFormRoutes.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const controller = require("../controllers/genericFormController");

router.use(adminAuth(["ADMIN", "SUPERADMIN"]));

// CREATE
router.post("/:formKey", controller.createRecord);

// GET ALL
router.get("/:formKey", controller.getAll);

// GET BY ID
router.get("/:formKey/:id", controller.getById);

// UPDATE
router.put("/:formKey/:id", controller.update);

// DELETE
router.delete("/:formKey/:id", controller.delete);

module.exports = router;
