var express = require('express');
var router = express.Router();
const {checkToken} = require('../_helpers/authorization/authorize');
var guard = require('express-jwt-permissions')()
const role = require('../_helpers/authorization/role');

//Controllers
var devicesController=require('../controllers/devicesController')
var vehicleController=require('../controllers/vehicleController')
// var driverController=require('../controllers/driverContorller')
var managerController=require('../controllers/managerController')

//ADMIN ROUTES
router.get('/admin/device', devicesController.list);
router.get('/admin/device/:id', devicesController.show);
router.post('/admin/device/', devicesController.create);
router.put('/admin/device/:id', devicesController.update);
router.delete('/admin/device/:id', devicesController.remove);

router.get('/admin/vehicle', vehicleController.list);
router.get('/admin/vehicle/:id', vehicleController.show);
router.post('/admin/vehicle/', vehicleController.create);
router.put('/admin/vehicle/:id', vehicleController.update);
router.delete('/admin/vehicle/:id', vehicleController.remove);

// router.get('/admin/driver', driverController.list);
// router.get('/admin/driver/:id', driverController.show);
// router.post('/admin/driver/', driverController.create);
// router.put('/admin/driver/:id', driverController.update);
// router.delete('/admin/driver/:id', driverController.remove);

router.get('/admin/manager', managerController.list);
router.get('/admin/manager/:id', managerController.show);
router.post('/admin/manager/', managerController.create);
router.put('/admin/manager/:id', managerController.update);
router.delete('/admin/manager/:id', managerController.remove);


//MANAGER ROUTES

router.get('/manager/device', devicesController.list);
router.get('/manager/device/:id', devicesController.show);
router.post('/manager/device/', devicesController.create);
router.put('/manager/device/:id', devicesController.update);
router.delete('/manager/device/:id', devicesController.remove);

router.get('/manager/vehicle', vehicleController.list);
router.get('/manager/vehicle/:id', vehicleController.show);
router.post('/manager/vehicle/', vehicleController.create);
router.put('/manager/vehicle/:id', vehicleController.update);
router.delete('/manager/vehicle/:id', vehicleController.remove);

//Driver ROUTES

module.exports = router;
