const Products = require('../models/Products')
const cloudinary = require('cloudinary').v2


exports.getProducts = (req,res,next) => {
    return Products.find().then(result => res.status(201).json({
        status: 1,
        message: 'Successful',
        result: result
    })).catch(err => {
        return res.status(500).json({
            status: 0,
            message: 'Failed',
            result: []
        })
    })
}
exports.postProducts = (req,res,next) => {
    const type = req.body.type
    const status = req.body.status
    const description = req.body.description
    const name = req.body.name
    const price = req.body.price
    const base64 = req.body.base64
    return cloudinary.uploader.upload(base64, {
        overwrite: true,
        invalidate: true,
    }, function (error, resUp) {
        if(!error) {
            const product = new Products({
                type,
                status, 
                description,
                name,
                price,
                imgUrl: resUp.secure_url
            })
            console.log({
                type,
                status, 
                description,
                name,
                price,
                imgUrl: resUp.secure_url})
            return Products.findOne({name: name}).then(result => {
                if(!result) {
                    return product.save().then(postResult => res.status(201).json({
                        status: 1,
                        message: 'Post created successfully',
                        result: postResult
                    })).catch(err => res.status(500).json({
                        status:0,
                        message: 'Something went wrong!',
                        error: err
                    }))
                }
                return res.status(500).json({
                    status: 0,
                    message:'Something went wrong',
                    error: []

                })
            })
            
        } else {
            return res.status(501).json({
                status:0,
                message: 'Something went wrong',
                error: error
            })
        }
    });
}
exports.deleteProduct = (req,res,next) => {
    const _id = req.params.id
    return Products.findById(_id).then(result => {
        if(result) {
            return Products.deleteOne(result).then(result => {
                return res.status(201).json({
                    status: 1,
                    message: 'Delete successful',
                    result: result
                })
            })
        }
        return res.status(404).json({
            status: 0,
            message: "Can't find user with id",
            result: []
        })
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: 'Failed',
            result: []
        })
    })
}
exports.getOneProduct = (req,res,next) => {
    const _id = req.params.id
    return Products.findById(_id).then(result => {
        if(result){ 
            return res.status(200).json({
                message: 'successful',
                status: 1,
                result: result
            })
        }
        return res.status(404).json({
            message: 'failed',
            status: 0,
            result: [],
        })
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            result: []
        })
    })
}
exports.updateProduct = (req,res,next) => {
    const _id = req.params.id
    const type = req.body.type
    const status = req.body.status
    const description = req.body.description
    const name = req.body.name
    const price = req.body.price
    const base64 = req.body.base64
    Products.findById(_id).then(product => {
        if(product) {
            product.type = type
            product.status = status
            product.description = description
            product.name = name
            product.price = price
            if(base64) {
                return cloudinary.uploader.upload(base64, {
                    overwrite: true,
                    invalidate: true,
                }, function (error, resUp) {
                    if(!error) {
                        
                        product.imgUrl = resUp.secure_url
                        return Products.findOne({name: name}).then(result => {
                            if(!result) {
                                return product.save().then(postResult => res.status(201).json({
                                    status: 1,
                                    message: 'Post updated successfully',
                                    result: postResult
                                })).catch(err => res.status(500).json({
                                    status:0,
                                    message: 'Something went wrong!',
                                    error: err
                                }))
                            }
                            return res.status(500).json({
                                status: 0,
                                message:'Something went wrong',
                                error: []
            
                            })
                        })
                        
                    } else {
                        return res.status(501).json({
                            status:0,
                            message: 'Something went wrong',
                            error: error
                        })
                    }
                });
            }
            return product.save().then(result => res.status(201).json({
                message: 'Update Post successful',
                status: 1,
                result: result
            })).catch(err => res.status(500).json({
                message: 'Failed',
                status: 0,
                result: []
            }))
        }
    })
}