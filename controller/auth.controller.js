const User = require("../model/User");

exports.register = (req, res, next) => {
    const {
        name, email, password
    } = req.body;
    
    const user = new User(
        null, name, email, password, 'user'
    );

    user
        .save()
        .then(() => {
            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: 'Something Went Wrong While Creating User!',
                    data: null
                })
            }
            res.status(201).send({
                success: false,
                message: 'User Created Successfully',
                data: user
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Creating User!',
                data: err.message
            })
        })
}