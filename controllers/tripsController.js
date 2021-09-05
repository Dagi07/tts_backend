var tripsModel = require('../models/tripsModel.js');
var vehicleModel = require('../models/vehicleModel.js');
var driverModel = require('../models/driverModel.js');
const getuser = require("../_helpers/authorize").getUser;

/**
 * tripsController.js
 *
 * @description :: Server-side logic for managing tripss.
 */
module.exports = {
    /**
       * tripsController.stop_trip()
       */
     stop_trip: function (req, res) {
        console.log(req.body)
        var body= req.body;

        tripsModel.findOne({ _id: body.trip_id }, function (err, trips) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trips',
                    error: err
                });
            }
            if (!trips) {
                return res.status(404).json({
                    message: 'No such trips'
                });
            }

            trips.active = false;
            
            trips.save(function (err, trips) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating trips.',
                        error: err
                    });
                }

                return res.json(trips);
            });
        });
    },
    
    /**
       * tripsController.update_location()
       */
    update_location: function (req, res) {
        console.log(req.body)
        var body= req.body;

        tripsModel.findOne({ _id: body.trip_id }, function (err, trips) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trips',
                    error: err
                });
            }
            if (!trips) {
                return res.status(404).json({
                    message: 'No such trips'
                });
            }

            trips.current_location = req.body.current_location ? req.body.current_location : trips.current_location;
            
            trips.save(function (err, trips) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating trips.',
                        error: err
                    });
                }

                return res.json(trips);
            });
        });
    },
    /**
     * tripsController.list()
     */
    list: function (req, res) {
        var query = req.query
        if (query.active === 'true') {
            query.active = true
        }
        if (query.active === 'false') {
            query.active = false
        }
        console.log(query)

        tripsModel.find(req.query).populate('driver').populate('vehicle').populate('device').exec(function (err, tripss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trips.',
                    error: err
                });
            }
            return res.json(tripss);
        });
    },

    /**
     * tripsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        tripsModel.findOne({ _id: id }, function (err, trips) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trips.',
                    error: err
                });
            }
            if (!trips) {
                return res.status(404).json({
                    message: 'No such trips'
                });
            }
            return res.json(trips);
        });
    },

    /**
     * tripsController.create()
     */
    create: async function (req, res) {
        var user = getuser(req).user
        console.log(req.body)
        if (user) {
            var vehicle = await vehicleModel.findOne({ driver: user._id })
            var trips = new tripsModel({
                driver: user._id,
                vehicle: vehicle._id,
                device: vehicle.device,
                starting_location: req.body.starting_location,
                destination_location: req.body.destination_location,
                current_location: req.body.current_location,
                description: req.body.starting_location + " " + "to" + " " + req.body.destination_location,
                trip_estimated: req.body.trip_estimated,
                trip_start_time: Date.now(),
                active: true,
                started: true,
                stopped: false

            });
            trips.save(function (err, trips) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating trips',
                        error: err
                    });
                }
                return res.status(201).json(trips);
            });
        }
        else {
            return res.status(500).json({
                message: 'Error when creating trips',
                error: err
            });
        }
    },

    /**
     * tripsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        tripsModel.findOne({ _id: id }, function (err, trips) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trips',
                    error: err
                });
            }
            if (!trips) {
                return res.status(404).json({
                    message: 'No such trips'
                });
            }

            trips.driver = req.body.driver ? req.body.driver : trips.driver;
            trips.vehicle = req.body.vehicle ? req.body.vehicle : trips.vehicle;
            trips.device = req.body.device ? req.body.device : trips.device;
            trips.starting_location = req.body.starting_location ? req.body.starting_location : trips.starting_location;
            trips.destination_location = req.body.destination_location ? req.body.destination_location : trips.destination_location;
            trips.current_location = req.body.current_location ? req.body.current_location : trips.current_location;
            trips.description = req.body.description ? req.body.description : trips.description;
            trips.trip_estimated = req.body.trip_estimated ? req.body.trip_estimated : trips.trip_estimated;
            trips.trip_start_time = req.body.trip_start_time ? req.body.trip_start_time : trips.trip_start_time;
            trips.active = req.body.active ? req.body.active : trips.active;
            trips.started = req.body.started ? req.body.started : trips.started;
            trips.stopped = req.body.stopped ? req.body.stopped : trips.stopped;

            trips.save(function (err, trips) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating trips.',
                        error: err
                    });
                }

                return res.json(trips);
            });
        });
    },

    /**
     * tripsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        tripsModel.findByIdAndRemove(id, function (err, trips) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the trips.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
