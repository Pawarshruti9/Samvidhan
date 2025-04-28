import User from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
const registerUser = catchAsyncError(async (req, res, next) => {
    const avatarLocalPath = req.file?.path;
    // const myCloud = await uploadOnCloudinary(avatarLocalPath, "avatar");
    const { name, email, password, role, age, phone, } = req.body;
    var user;
    if (role) {
        user = await User.create({
            name,
            email,
            password,
            role,
            age,
            phone,
        });
    } else {
        user = await User.create({
            name,
            email,
            password,
            age,
            phone,
        });
    }
    const accessToken = await user.getJWTToken();
    const userWithoutPassword = await User.findById(user._id).select('-password');
    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "user registered successfully", user: userWithoutPassword });
});

const loginUser = catchAsyncError(async (req, res, next) => {
    console.log('Login request received:', req.body);
    
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Missing email or password');
        return next(new ApiError(400, "Please Enter Email & Password"));
    }

    console.log('Looking for user with email:', email);
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
        console.log('User not found');
        return next(new ApiError(401, "Invalid email or password"));
    }

    console.log('User found, comparing passwords');
    const isPasswordMatched = await user.comparePassword(password);
    
    if (!isPasswordMatched) {
        console.log('Password mismatch');
        return next(new ApiError(401, "Invalid email or password"));
    }

    console.log('Password matched, generating token');
    const accessToken = await user.getJWTToken();
    const userWithoutPassword = await User.findById(user._id).select('-password');
    
    console.log('Login successful, sending response');
    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ 
            success: true, 
            message: "Login successful", 
            user: userWithoutPassword 
        });
});
const logoutUser = catchAsyncError(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
        })
        .json({ success: true, message: "user Logged out successfully" });
});
const getCurrentUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ApiError(500, `User does not exist with Id ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ApiError(500, "User does not exist to id"));
    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
});

const updateProgress = catchAsyncError(async (req, res, next) => {
    const { moduleName, status } = req.body;
    const userId = req.user.id;

    console.log('Updating progress request:', { moduleName, status, userId });

    // Validate module name
    const validModules = ['preamble', 'fundamental-rights', 'directive-principles', 'fundamental-duties'];
    if (!validModules.includes(moduleName)) {
        console.log('Invalid module name:', moduleName);
        return next(new ApiError(400, 'Invalid module name'));
    }

    // Validate status
    const validStatuses = ['started', 'inprogress', 'completed'];
    if (!validStatuses.includes(status)) {
        console.log('Invalid status:', status);
        return next(new ApiError(400, 'Invalid status'));
    }

    try {
        // Update the progress
        const user = await User.findByIdAndUpdate(
            userId,
            { [`progress.${moduleName}`]: status },
            { new: true }
        );

        if (!user) {
            console.log('User not found:', userId);
            return next(new ApiError(404, 'User not found'));
        }

        console.log('Progress updated successfully:', user.progress);
        res.status(200).json({
            success: true,
            message: 'Progress updated successfully',
            user
        });
    } catch (error) {
        console.error('Error updating progress:', error);
        next(new ApiError(500, 'Error updating progress'));
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateProgress,
};