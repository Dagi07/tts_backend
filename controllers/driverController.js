var driverModel = require('../models/driverModel.js');
var vehicleModel = require('../models/vehicleModel.js');

/**
 * driverController.js
 *
 * @description :: Server-side logic for managing drivers.
 */
module.exports = {

    /**
     * driverController.list()
     */
    list: function (req, res) {
        driverModel.find({}).populate('vehicle_assigned').exec(function (err, drivers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting driver.',
                    error: err
                });
            }
            return res.json(drivers);
        });
    },

    /**
     * driverController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        driverModel.findOne({ _id: id }, function (err, driver) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting driver.',
                    error: err
                });
            }
            if (!driver) {
                return res.status(404).json({
                    message: 'No such driver'
                });
            }
            return res.json(driver);
        });
    },

    /**
     * driverController.create()
     */
    create: function (req, res) {
        var driver = new driverModel({
            vehicle_assigned: req.body.vehicle_assigned,
            phone_number: req.body.phone_number,
            password: req.body.password,
            licence_number: req.body.licence_number,
            full_name: req.body.full_name,
            email: req.body.email,
            role: "driver"

        });

        driver.save(function (err, driver) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating driver',
                    error: err
                });
            }
            return res.status(201).json(driver);
        });
    },

    /**
     * driverController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        driverModel.findOne({ _id: id },async function (err, driver) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting driver',
                    error: err
                });
            }
            if (!driver) {
                return res.status(404).json({
                    message: 'No such driver'
                });
            }

            driver.vehicle_assigned = req.body.vehicle_assigned ? req.body.vehicle_assigned : driver.vehicle_assigned;
            driver.phone_number = req.body.phone_number ? req.body.phone_number : driver.phone_number;
            driver.password = req.body.password ? req.body.password : driver.password;
            driver.licence_number = req.body.licence_number ? req.body.licence_number : driver.licence_number;
            driver.full_name = req.body.full_name ? req.body.full_name : driver.full_name;
            driver.email = req.body.email ? req.body.email : driver.email;
            driver.role = req.body.role ? req.body.role : driver.role;

            await vehicleModel.findOne({ _id: driver.vehicle_assigned },async function (err, vehicle) {
                if (err) {}
                if (!vehicle) {}

                vehicle.driver = driver._id;
                
                await vehicle.save(function (err, vehicle) {
                    if (err) {}
                });
            });
            driver.save(function (err, driver) {
                if (err) {
                    console.log(err)
                    res.status(500).json({
                        message: 'Error when updating driver.',
                        error: err
                    });
                }

                res.json(driver);
            });

        });
    },

    /**
     * driverController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        driverModel.findByIdAndRemove(id, function (err, driver) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the driver.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
