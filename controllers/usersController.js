const User = require('../models/User')

class UsersController {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: ''})
        }
    }
    async getUser(req, res) {
        try {
            const {id} = req.params;

            const user = await User.findOne(
                {_id: id},
                {
                    _id: 1,
                    userName: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phone: 1,
                    age: 1,
                    work: 1,
                }
                );

            if(!user) {
                return res.status(400).json({message: "Пользователь не найден"})
            }

            res.json(user)

        } catch (e) {
            console.log(e)
            res.status(400).json({message: ''})
        }
    }
}

module.exports = new UsersController()