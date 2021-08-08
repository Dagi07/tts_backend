var devicesModel = require('../models/devicesModel.js');

/**
 * devicesController.js
 *
 * @description :: Server-side logic for managing devicess.
 */
module.exports = {

    /**
     * devicesController.list()
     */
    list: function (req, res) {
        devicesModel.find(function (err, devicess) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting devices.',
                    error: err
                });
            }
            return res.json(devicess);
        });
    },

    /**
     * devicesController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        devicesModel.findOne({_id: id}, function (err, devices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting devices.',
                    error: err
                });
            }
            if (!devices) {
                return res.status(404).json({
                    message: 'No such devices'
                });
            }
            return res.json(devices);
        });
    },

    /**
     * devicesController.create()
     */
    create: function (req, res) {
        var devices = new devicesModel({
			deviceId : req.body.deviceId,
			last_location : req.body.last_location,
			last_location_updated : req.body.last_location_updated

        });

        devices.save(function (err, devices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating devices',
                    error: err
                });
            }
            return res.status(201).json(devices);
        });
    },

    /**
     * devicesController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        devicesModel.findOne({_id: id}, function (err, devices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting devices',
                    error: err
                });
            }
            if (!devices) {
                return res.status(404).json({
                    message: 'No such devices'
                });
            }

            devices.deviceId = req.body.deviceId ? req.body.deviceId : devices.deviceId;
			devices.last_location = req.body.last_location ? req.body.last_location : devices.last_location;
			devices.last_location_updated = req.body.last_location_updated ? req.body.last_location_updated : devices.last_location_updated;
			
            devices.save(function (err, devices) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating devices.',
                        error: err
                    });
                }

                return res.json(devices);
            });
        });
    },

    /**
     * devicesController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        devicesModel.findByIdAndRemove(id, function (err, devices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the devices.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
