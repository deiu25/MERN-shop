const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "avatars/kwqjv9z1xqg6jwzjzj9g",
            url: "https://res.cloudinary.com/dfqf3lsjt/image/upload/v1620934250/avatars/kwqjv9z1xqg6jwzjzj9g.jpg",
        },
    });

    // const user = await User.create({
    //     name,
    //     email,
    //     password,
    // });

    const token = user.g
    res.status(201).json({
        success: true,
        user,
    });
    sendToken(user, 200, res);
});
