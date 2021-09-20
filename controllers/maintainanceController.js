var maintainanceModel = require('../models/maintainanceModel.js');

/**
 * maintainanceController.js
 *
 * @description :: Server-side logic for managing maintainances.
 */
module.exports = {

    /**
     * maintainanceController.list()
     */
    list: function (req, res) {
        maintainanceModel.find({}).populate('vehicle').exec(function (err, maintainances) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting maintainance.',
                    error: err
                });
            }
            return res.json(maintainances);
        });
    },

    /**
     * maintainanceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        maintainanceModel.findOne({_id: id}, function (err, maintainance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting maintainance.',
                    error: err
                });
            }
            if (!maintainance) {
                return res.status(404).json({
                    message: 'No such maintainance'
                });
            }
            return res.json(maintainance);
        });
    },

    /**
     * maintainanceController.create()
     */
    create: function (req, res) {
        console.log(req.body)
        var maintainance = new maintainanceModel({
			vehicle : req.body.vehicle,
			description : req.body.description,
			mileage : req.body.mileage

        });

        maintainance.save(function (err, maintainance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating maintainance',
                    error: err
                });
            }
            return res.status(201).json(maintainance);
        });
    },

    /**
     * maintainanceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        maintainanceModel.findOne({_id: id}, function (err, maintainance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting maintainance',
                    error: err
                });
            }
            if (!maintainance) {
                return res.status(404).json({
                    message: 'No such maintainance'
                });
            }

            maintainance.vehicle = req.body.vehicle ? req.body.vehicle : maintainance.vehicle;
			maintainance.description = req.body.description ? req.body.description : maintainance.description;
			maintainance.mileage = req.body.mileage ? req.body.mileage : maintainance.mileage;
			
            maintainance.save(function (err, maintainance) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating maintainance.',
                        error: err
                    });
                }

                return res.json(maintainance);
            });
        });
    },

    /**
     * maintainanceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        maintainanceModel.findByIdAndRemove(id, function (err, maintainance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the maintainance.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
