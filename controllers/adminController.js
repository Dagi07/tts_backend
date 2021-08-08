var adminModel = require('../models/adminModel.js');


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
 * adminController.js
 *
 * @description :: Server-side logic for managing admins.
 */
module.exports = {
    /**
 * * adminController.register()
 */
    register: async function (req, res) {

        if (req.body.reg_key === process.env.ADMIN_REG_KEY) {
            let admin_check = await adminModel.findOne({ username: req.body.username });
            if (admin_check) {
                return res.status(400).json({
                    success: false,
                    message: `Username already in use`,
                });
            }
            const hashed_password = await hashPasword(req.body.password);
            //console.log("Hashed!!");
            var Admin = new adminModel({
                full_name:req.body.full_name,
                username: req.body.username,
                password: hashed_password,
                role : 'admin'
            });

            Admin.save(function (err, admin) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error when creating User",
                        error: err,
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: `Successfully Registered Admin!`,
                });
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: `No API Route!`,
            });
        }

    },
    /**
             * adminController.login()
             */
    login: async function (req, res) {
        console.log("Logging In...")
        const body = req.body;
        let admin = await adminModel.findOne({ username: body.username })
        console.log(admin)
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: `Incorrect Phone or Password`
            });
        }
        else {
            console.log(await isPasswordCorrect(body.password, admin.password))
            if (await isPasswordCorrect(body.password, admin.password)) {
                //nexmo.message.sendSms(from, to, text);
                var tmpAdminObj = {
                    _id: admin._id,
                    full_name:admin.full_name,
                    username: admin.username,
                    createdAt: admin.createdAt,
                    updatedAt: admin.updatedAt,
                    __v: admin.__v
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
     * adminController.list()
     */
    list: function (req, res) {
        adminModel.find(function (err, admins) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting admin.',
                    error: err
                });
            }
            return res.json(admins);
        });
    },

    /**
     * adminController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        adminModel.findOne({ _id: id }, function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting admin.',
                    error: err
                });
            }
            if (!admin) {
                return res.status(404).json({
                    message: 'No such admin'
                });
            }
            return res.json(admin);
        });
    },

    /**
     * adminController.create()
     */
    create: function (req, res) {
        var admin = new adminModel({
            full_name: req.body.full_name,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role

        });

        admin.save(function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating admin',
                    error: err
                });
            }
            return res.status(201).json(admin);
        });
    },

    /**
     * adminController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        adminModel.findOne({ _id: id }, function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting admin',
                    error: err
                });
            }
            if (!admin) {
                return res.status(404).json({
                    message: 'No such admin'
                });
            }

            admin.full_name = req.body.full_name ? req.body.full_name : admin.full_name;
            admin.username = req.body.username ? req.body.username : admin.username;
            admin.password = req.body.password ? req.body.password : admin.password;
            admin.role = req.body.role ? req.body.role : admin.role;

            admin.save(function (err, admin) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating admin.',
                        error: err
                    });
                }

                return res.json(admin);
            });
        });
    },

    /**
     * adminController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        adminModel.findByIdAndRemove(id, function (err, admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the admin.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
