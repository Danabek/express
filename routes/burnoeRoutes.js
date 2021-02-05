const express = require('express');

const burnoeController = require('../controllers/BurnoeController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', requireAuth, burnoeController.burnoe_index);

router.get('/goals', burnoeController.burnoe_goals)


router.get('/:year', burnoeController.burnoe_reports)



module.exports = router;