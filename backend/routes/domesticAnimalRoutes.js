const express = require("express");
const router = express.Router();
const controller = require("../controllers/domesticAnimalController");

// POST create
router.post("/", controller.createRecord);

// GET all
router.get("/", controller.getAll);

// GET by id
router.get("/:id", controller.getById);

// PUT update
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.delete);

module.exports = router;
