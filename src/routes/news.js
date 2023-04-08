const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsCotroller');

//newsController.index = function

router.get('/:slug', newsController.show);

router.get('/', newsController.index);

module.exports = router;
