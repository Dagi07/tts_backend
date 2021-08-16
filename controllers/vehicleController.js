var vehicleModel = require('../models/vehicleModel.js');
var driverModel = require('../models/driverModel.js');

/**
 * vehicleController.js
 *
 * @description :: Server-side logic for managing vehicles.
 */
module.exports = {

    /**
     * vehicleController.list()
     */
    list: function (req, res) {
        vehicleModel.find({}).populate("driver").populate("device").exec(function (err, vehicles) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Error when getting vehicle.',
                    error: err
                });
            }
            return res.json(vehicles);
        });
    },

    /**
     * vehicleController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        vehicleModel.findOne({ _id: id }, function (err, vehicle) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting vehicle.',
                    error: err
                });
            }
            if (!vehicle) {
                return res.status(404).json({
                    message: 'No such vehicle'
                });
            }
            return res.json(vehicle);
        });
    },

    /**
     * vehicleController.create()
     */
    create: function (req, res) {
        var vehicle = new vehicleModel({
            driver: req.body.driver,
            device: req.body.device,
            plate_number: req.body.plate_number,
            car_manufacturer: req.body.car_manufacturer,
            car_model: req.body.car_model,
            fuel_usage: req.body.fuel_usage,
            carrying_capacity: req.body.carrying_capacity,
            make_date: req.body.make_date,
            manufacture_date: req.body.manufacture_date

        });

        vehicle.save(function (err, vehicle) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating vehicle',
                    error: err
                });
            }
            return res.status(201).json(vehicle);
        });
    },

    /**
     * vehicleController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        vehicleModel.findOne({ _id: id }, async function (err, vehicle) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting vehicle',
                    error: err
                });
            }
            if (!vehicle) {
                return res.status(404).json({
                    message: 'No such vehicle'
                });
            }

            vehicle.driver = req.body.driver ? req.body.driver : vehicle.driver;
            vehicle.device = req.body.device ? req.body.device : vehicle.device;
            vehicle.plate_number = req.body.plate_number ? req.body.plate_number : vehicle.plate_number;
            vehicle.car_manufacturer = req.body.car_manufacturer ? req.body.car_manufacturer : vehicle.car_manufacturer;
            vehicle.car_model = req.body.car_model ? req.body.car_model : vehicle.car_model;
            vehicle.fuel_usage = req.body.fuel_usage ? req.body.fuel_usage : vehicle.fuel_usage;
            vehicle.carrying_capacity = req.body.carrying_capacity ? req.body.carrying_capacity : vehicle.carrying_capacity;
            vehicle.make_date = req.body.make_date ? req.body.make_date : vehicle.make_date;
            vehicle.manufacture_date = req.body.manufacture_date ? req.body.manufacture_date : vehicle.manufacture_date;

            await driverModel.findOne({ _id: vehicle.driver }, async function (err, driver) {
                if (err) { }
                if (!driver) { }

                driver.vehicle_assigned = vehicle._id

                await driver.save(function (err, driver) {
                    if (err) {}
                });

            });
            vehicle.save(function (err, vehicle) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating vehicle.',
                        error: err
                    });
                }

                return res.json(vehicle);
            });
        });
    },

    /**
     * vehicleController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        vehicleModel.findByIdAndRemove(id, function (err, vehicle) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the vehicle.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
