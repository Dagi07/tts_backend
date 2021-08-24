var express = require('express');
var router = express.Router();
const {checkToken} = require('../_helpers/authorization/authorize');
var guard = require('express-jwt-permissions')()
const role = require('../_helpers/authorization/role');
var adminController = require('../controllers/adminController');
var managerController = require('../controllers/managerController');
var driverController = require('../controllers/driverController');

const { UnauthorizedError } = require('express-jwt');




//UNAUTH ROUTES
router.post('/admin/init', adminController.register);
router.post('/manager/init', managerController.create);

router.post('/admin/login', adminController.login);
router.post('/manager/login', managerController.login);
router.post('/driver/login', driverController.login);

module.exports = router;
