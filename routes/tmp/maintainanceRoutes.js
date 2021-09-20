var express = require('express');
var router = express.Router();
var maintainanceController = require('../../controllers/maintainanceController.js');

/*
 * GET
 */
router.get('/', maintainanceController.list);

/*
 * GET
 */
router.get('/:id', maintainanceController.show);

/*
 * POST
 */
router.post('/', maintainanceController.create);

/*
 * PUT
 */
router.put('/:id', maintainanceController.update);

/*
 * DELETE
 */
router.delete('/:id', maintainanceController.remove);

module.exports = router;
