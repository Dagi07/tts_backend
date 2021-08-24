var driverModel = require('../models/driverModel.js');
var vehicleModel = require('../models/vehicleModel.js');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//hash password
const hashPasword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return done(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash);
            });
        });
    });
};
//Password Checker
const isPasswordCorrect = async (pass1, pass2) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass1, pass2, (err, result) => {
            resolve(result)
        })
    })
}
/**
 * driverController.js
 *
 * @description :: Server-side logic for managing drivers.
 */
module.exports = {
        /**
     * driverController.login()
     */
    login: async function (req, res) {
        console.log("Logging In...")
        const body = req.body;
        let driver = await driverModel.findOne({ phone_number: body.phone })
        console.log(driver)
        if (!driver) {
            return res.status(400).json({
                success: false,
                message: `Incorrect Phone or Password`
            });
        }
        else {
            console.log(await isPasswordCorrect(body.password, driver.password))
            if (await isPasswordCorrect(body.password, driver.password)) {
                //nexmo.message.sendSms(from, to, text);
                var tmpAdminObj = {
                    _id: driver._id,
                    full_name:driver.full_name,
                    username: driver.username,
                    createdAt: driver.createdAt,
                    updatedAt: driver.updatedAt,
                    __v: driver.__v
                }
                jwt.sign(
                    {
                        permissions: ['admin'],
                        user: tmpAdminObj
                    }, "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    (err, token) => {
                        return res.status(200).json({
                            success: true,
                            message: `Sign In Successfull`,
                            token: "Bearer " + token,
                        });
                    }
                );
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: `Incorrect Phone or Password`
                });
            }
        }
    },
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
    create:async function (req, res) {
        var driver = new driverModel({
            vehicle_assigned: req.body.vehicle_assigned,
            phone_number: req.body.phone_number,
            password: req.body.password,
            licence_number: req.body.licence_number,
            full_name: req.body.full_name,
            email: req.body.email,
            role: "driver"

        });
        driver.password = await hashPasword(req.body.password)

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
