const Users = require('../models/Users')

exports.getUsers = (req,res,next) => {
    return Users.find().then(result => res.status(201).json({
        status:1,
        message: 'successful',
        results: result
    })).catch(err => res.status(500).json({
        message: 'Something went wrong',
        result: [],
        status: 0
    }))
}
exports.postUser = (req,res,next) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const title = req.body.title
    const message = req.body.message
    const user = new Users({
        name,
        email,
        phone,
        title,
        message,
    })
    return user.save().then(result => res.status(201).json({
        status: 1,
        message:'Successful',
        result: result
    })).catch(err => res.status(500).json({
        message: 'Something went wrong',
        result: [],
        status: 0
    }))
}