const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipesController');

// GET
router.get('/', controller.get);

// Export
module.exports = router;
