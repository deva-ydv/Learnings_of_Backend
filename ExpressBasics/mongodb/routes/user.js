const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db");

router.post("/signup", async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            msg: "missing username or password"
        })
    }

    try{
        await User.create({
            username,
            password
        })
        res.json({
            msg: " user created successfully"
        })
    }catch(err){
        res.status(500).json({
            msg: "error creating user"
        })
    }

});
router.get("/courses", async (req, res) => {
    const response = await Course.find({});
    res.json({
            courses: response
    })
});
router.post("/courses/:courseId", userMiddleware, async (req, res) => {

    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    },{
       "$push":{
        purchasedCourses: courseId
       }

    })

    res.json({
        msg: "purchased complete"
    })

});
router.get("/purchasedCourses", userMiddleware, async(req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    })
    console.log(user.purchasedCourses)
    res.json({
        msg: "get purchased"
    })

});

module.exports = router;
