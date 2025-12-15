const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://devaydv18_db_user:PY9wKT1AkHJoa6Jn@cluster0.ztrd28u.mongodb.net/course_selling_app')
// mongoose.connect('mongodb+srv://devaydv18_db_user:<PY9wKT1AkHJoa6Jn>@cluster0.ztrd28u.mongodb.net/course_selling_app')

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
    
})
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
})


const Admin = mongoose.model('Admin',AdminSchema)
const User = mongoose.model('User',UserSchema)
const Course = mongoose.model('Course',CourseSchema)

module.exports = {
    Admin, User, Course
}