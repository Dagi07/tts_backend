var express = require('express');
var router = express.Router();
var managerController = require('../controllers/managerController.js');

/*
 * GET
 */
router.get('/', managerController.list);

/*
 * GET
 */
router.get('/:id', managerController.show);

/*
 * POST
 */
router.post('/', managerController.create);

/*
 * PUT
 */
router.put('/:id', managerController.update);

/*
 * DELETE
 */
router.delete('/:id', managerController.remove);

module.exports = router;
