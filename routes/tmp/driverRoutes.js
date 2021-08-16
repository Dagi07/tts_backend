var express = require('express');
var router = express.Router();
var driverController = require('../../controllers/driverController.js');

/*
 * GET
 */
router.get('/', driverController.list);

/*
 * GET
 */
router.get('/:id', driverController.show);

/*
 * POST
 */
router.post('/', driverController.create);

/*
 * PUT
 */
router.put('/:id', driverController.update);

/*
 * DELETE
 */
router.delete('/:id', driverController.remove);

module.exports = router;
