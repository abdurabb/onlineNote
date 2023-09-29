const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {

        const body = req.body.values
        const emailCheck = await User.findOne({ email: body.email })
        if (emailCheck) {
            return res.status(400).json({
                success: false,
                messege: 'Email Already Registred'
            })
        }

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Data',
            })
        }

        const spassword = await bcrypt.hash(body.password, 10)
        const user1 = new User({
            first_name: body.name,
            email: body.email,
            password: spassword,
        })
        const userData = user1.save()
        if (userData) {
            return res.status(200).json({
                success: true,
                messege: 'Successfully Registred'
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege:'Something Wrong',
            error: error
        })
    }
}

const login = async (req, res) => {
    try {
        const body = req.body.values;
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Data',
            })
        }
        const userDetail = await User.findOne({ email: body.email })
        if (userDetail) {
            const passwordMatch = await bcrypt.compare(body.password, userDetail.password)
            if (passwordMatch) {
                // JWT
                let userLogin = {
                    userId: null,
                    Status: false,
                    message: null,
                    token: null,
                    name: null,
                };

                userLogin.Status = true;
                userLogin.name = userDetail.first_name;
                userLogin.userId = userDetail._id;
                userLogin.message = 'success'
                let token = jwt.sign({ id: userDetail._id }, "secretCodeforUser", {
                    expiresIn: "30d",
                });
                userLogin.token = token;
                let name = userDetail.first_name

                let obj = {
                    token,
                    name
                };

                return res.status(200).json({
                    success: true,
                    messege: 'Succecfully Loged',
                    obj: obj,
                    userLogin: userLogin
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Incorrect User or Password',
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                error: 'Incorrect User or Password',
            })
        }



    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}

module.exports = { register, login }