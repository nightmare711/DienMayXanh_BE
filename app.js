const express = require('express')
const mongoose = require('mongoose')
const productsRoute = require('./routes/products')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2
const UsersController = require('./controller/users')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json({
    limit:'50mb'
}))
app.use(bodyParser.urlencoded({extended: false}))
cloudinary.config({
    cloud_name: "asdasdasdasdfwdeqwqweqweqweqwe",
    api_key: "596556411564525",
    api_secret: "Hj_pNkl-E9_ODKK4SPwJ6maP544"
});

app.use(productsRoute)
app.get('/users', UsersController.getUsers)
app.post('/users', UsersController.postUser)

mongoose.connect('mongodb+srv://tranhoang:KoOn711286@cluster0.sg7xo.mongodb.net/products').then(() => app.listen(process.env.PORT || 5000, () => console.log('app listen at port 4000'))).catch(err => console.log(err))
