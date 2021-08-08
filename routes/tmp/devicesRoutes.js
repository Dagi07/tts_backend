var express = require('express');
var router = express.Router();
var devicesController = require('../controllers/devicesController.js');

/*
 * GET
 */
router.get('/', devicesController.list);

/*
 * GET
 */
router.get('/:id', devicesController.show);

/*
 * POST
 */
router.post('/', devicesController.create);

/*
 * PUT
 */
router.put('/:id', devicesController.update);

/*
 * DELETE
 */
router.delete('/:id', devicesController.remove);

module.exports = router;
