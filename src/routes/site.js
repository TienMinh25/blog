const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// newsController.index()

router.use('/:slug', siteController.search);
router.use('/', siteController.index); 


module.exports = router;
