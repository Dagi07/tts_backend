var express = require('express');
var router = express.Router();
const {checkToken} = require('../_helpers/authorization/authorize');
var guard = require('express-jwt-permissions')()
const role = require('../_helpers/authorization/role');

//Controllers
var devicesController=require('../controllers/devicesController')
var vehicleController=require('../controllers/vehicleController')
var driverController=require('../controllers/driverController')
var managerController=require('../controllers/managerController')

const authorize = require('../_helpers/authorize');
const tripsController = require('../controllers/tripsController');


router.post("/token", authorize.validateToken, authorize.check_token_with_fcm);

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

router.get('/admin/driver', driverController.list);
router.get('/admin/driver/:id', driverController.show);
router.post('/admin/driver/', driverController.create);
router.put('/admin/driver/:id', driverController.update);
router.delete('/admin/driver/:id', driverController.remove);

router.get('/admin/manager', managerController.list);
router.get('/admin/manager/:id', managerController.show);
router.post('/admin/manager/', managerController.register);
router.put('/admin/manager/:id', managerController.update);
router.delete('/admin/manager/:id', managerController.remove);

router.get('/admin/trips', tripsController.list);
router.get('/admin/trips/:id', tripsController.show);
router.post('/admin/trips/', tripsController.create);
router.put('/admin/trips/:id', tripsController.update);
router.delete('/admin/trips/:id', tripsController.remove);



//MANAGER ROUTES
router.get('/manager/dash/get_data', managerController.get_dash_data);

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
router.post('/driver/create_trip', tripsController.create);
router.get('/driver/get_my_data', driverController.get_my_data);
router.post('/driver/update_location', tripsController.update_location);
router.post('/driver/stop_trip', tripsController.stop_trip);

module.exports = router;
