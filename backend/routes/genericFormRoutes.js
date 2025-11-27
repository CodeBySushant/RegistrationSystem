// backend/routes/genericFormRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/genericFormController");

// POST create
router.post("/:formKey", controller.createRecord);

// GET all
router.get("/:formKey", controller.getAll);

// GET by id
router.get("/:formKey/:id", controller.getById);

// PUT update
router.put("/:formKey/:id", controller.update);

// DELETE
router.delete("/:formKey/:id", controller.delete);

module.exports = router;
