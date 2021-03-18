const partsController = require("../../Controllers/PartsController.js");
const express = require("express");

let router = express.Router();

router.get("/parts", partsController.getAll);
router.get("/parts:name", partsController.getByName);
router.post("/parts/edit", partsController.changePartByID);
router.post("/parts/checkout", partsController.checkoutPartByID);
router.post("/parts/checkin", partsController.checkInPartByID);

module.exports = router;