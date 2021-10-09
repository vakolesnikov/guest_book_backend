const Post = require('../models/Post')

class PostsController {
    async getPosts(req, res) {
        try {
            const{userName, firstName, lastName, startDate, endDate, page, pageSize} = req.query;
            const filters = {}

            if(startDate || endDate) {
                filters.creatingDate = {}

                if(startDate) {
                    filters.creatingDate = {
                        ...filters.creatingDate,
                        $gte: Number(startDate),
                    }
                }
                if(endDate) {
                    filters.creatingDate = {
                        ...filters.creatingDate,
                        $lte: Number(endDate),
                    }
                }

            }

            if(userName) {
                filters.userName = {
                    $regex: userName
                }
            }

            if(firstName) {
                filters.firstName = {
                    $regex: firstName
                }
            }

            if(lastName) {
                filters.lastName = {
                    $regex: lastName
                }
            }

            const result = await Post
                .aggregate([
                    { $match: filters },
                    { $sort: {creatingDate: -1} },
                    {
                        $facet: {
                            result: [
                                {
                                    $skip: Number(page - 1) * Number(pageSize),
                                },
                                {
                                    $limit: Number(pageSize),
                                },
                            ],
                            meta: [
                                {
                                    $count: 'totalCount',
                                },
                            ],
                        },
                    },
                    {
                        $unwind: '$meta',
                    },
                ])

            res.json(result[0] ?? {
                meta: {
                    totalCount: 0,
                },
                result: [],
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: ''})
        }
    }
    async createPost(req, res) {
        try {
            if(!req.body.messageText) {
                return res.status(400).json({message: 'Сообщение не может быть пустым'})
            }
            const post = new Post(req.body)
            await post.save()
            res.json({message: "Пост успешно создан"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка создания сообщения'})
        }
    }
}

module.exports = new PostsController()