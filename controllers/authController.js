const User = require('../models/User')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: `Errors: ${errors}`, errors})
            }
            const {userName, password, ...rest} = req.body;
            const candidate = await User.findOne({userName})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 3)
            const user = new User({userName, password: hashPassword, ...rest})
            await user.save()
            res.json({message: "Успешная регистрация"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: ''})
        }
    }
    async login(req, res) {
        try {
            const {userName, password} = req.body

            const user = await User.findOne({userName})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${userName} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login Error'})
        }
    }
}

module.exports = new AuthController()