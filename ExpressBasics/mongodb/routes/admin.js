const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require('../db');

// Admin signup
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: "Missing username or password"
        });
    }

    try {
        await Admin.create({
            username,
            password
        });

        res.json({
            msg: "Admin created successfully"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error creating admin"
        });
    }
});

// Create course
router.post("/courses", adminMiddleware, async (req, res) => {
    const { title, description, imageLink, price } = req.body;

    if (!title || !description || !imageLink || !price) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    try {
        const newCourse = await Course.create({
            title,
            description,
            imageLink,
            price
        });
        console.log(newCourse)
        return res.status(201).json({
            msg: "Course created successfully",
            courseId: newCourse._id
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Error creating course"
        });
    }
});


// Get courses
router.get("/courses", adminMiddleware, async (req, res) => {
   const response = await Course.find({});
   res.json({
        courses: response
   })
});

module.exports = router;
