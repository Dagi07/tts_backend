var managerModel = require('../models/managerModel.js');


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
 * managerController.js
 *
 * @description :: Server-side logic for managing managers.
 */
module.exports = {
    /**
                 * adminController.login()
                 */
    login: async function (req, res) {
        const body = req.body;
        let manager = await managerModel.findOne({ username: body.username })
        console.log(manager)
        if (!manager) {
            return res.status(400).json({
                success: false,
                message: `Incorrect Phone or Password`
            });
        }
        else {
            console.log(await isPasswordCorrect(body.password, manager.password))
            if (await isPasswordCorrect(body.password, manager.password)) {
                //nexmo.message.sendSms(from, to, text);
                var tmpAdminObj = {
                    _id: manager._id,
                    username: manager.username,
                    createdAt: manager.createdAt,
                    updatedAt: manager.updatedAt,
                    __v: admin.__v
                }
                jwt.sign(
                    {
                        permissions: ['manager'],
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
     * managerController.list()
     */
    list: function (req, res) {
        managerModel.find(function (err, managers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting manager.',
                    error: err
                });
            }
            return res.json(managers);
        });
    },

    /**
     * managerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        managerModel.findOne({ _id: id }, function (err, manager) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting manager.',
                    error: err
                });
            }
            if (!manager) {
                return res.status(404).json({
                    message: 'No such manager'
                });
            }
            return res.json(manager);
        });
    },

    /**
     * managerController.create()
     */
    create: function (req, res) {
        var manager = new managerModel({
            full_name: req.body.full_name,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role

        });

        manager.save(function (err, manager) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating manager',
                    error: err
                });
            }
            return res.status(201).json(manager);
        });
    },

    /**
     * managerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        managerModel.findOne({ _id: id }, function (err, manager) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting manager',
                    error: err
                });
            }
            if (!manager) {
                return res.status(404).json({
                    message: 'No such manager'
                });
            }

            manager.full_name = req.body.full_name ? req.body.full_name : manager.full_name;
            manager.username = req.body.username ? req.body.username : manager.username;
            manager.password = req.body.password ? req.body.password : manager.password;
            manager.role = req.body.role ? req.body.role : manager.role;

            manager.save(function (err, manager) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating manager.',
                        error: err
                    });
                }

                return res.json(manager);
            });
        });
    },

    /**
     * managerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        managerModel.findByIdAndRemove(id, function (err, manager) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the manager.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
