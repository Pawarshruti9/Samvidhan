import catchAsyncError from "../middleware/catchAsyncError.js"
import quiz from "../config/quizStore.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/userModel.js";
const getResult = catchAsyncError(async (req, res, next) => {
    const { quizId, userAnswers } = req.body;
    if (!quiz[quizId]) {
        return next(new ApiError(400, "Please Enter Valid test Id"));
    }
    const correctAnswers = quiz[quizId];
    let score = 0;
    correctAnswers.forEach((answer, index) => {
        if (answer === userAnswers[index]) {
            score += 1;
        }
    });
    const isPassed = score >= 7;
    let course = ""
    if (quizId === "quiz1")
        {course = "module1"} 
    else if (quizId === "quiz2")
        {course = "module2" } 
    else if ( quizId === "quiz3")
        {course = "module3" }
    else if ( quizId === "quiz4")
        {course = "module4"}

    if (isPassed) {
        const user = await User.findById(req.user.id);
        if (user) {
            user.progress[course] = "completed";
            await user.save();
        }
        console.log(req.user.id)
    }
    res.json({
        quizId,
        score,
        isPassed,
        message: isPassed ? "Congratulations! You passed." : "Try again! You failed."
    });

})

const changeStatusInprogress = catchAsyncError(async (req, res, next) => {
    const { quizId } = req.body;
    if (!quiz[quizId]) {
        return next(new ApiError(400, "Please Enter Valid test Id"));
    }
    
    let course = ""
    if (quizId === "quiz1")
        {course = "module1"} 
    else if (quizId === "quiz2")
        {course = "module2" } 
    else if ( quizId === "quiz3")
        {course = "module3" }
    else if ( quizId === "quiz4")
        {course = "module4"}
    const user = await User.findById(req.user.id);

    if (user.progress[course] === "completed"){
        return res.json({
            quizId,
            message: "You have already completed"
        });
    }
        
        
            user.progress[course] = "inprogress";
            await user.save();
        
        console.log(req.user.id)

    res.json({
        quizId,
        message: "You are in progress!"
    });

})

const changeStatusStarted = catchAsyncError(async (req, res, next) => {
    const { course } = req.body;

 
        const user = await User.findById(req.user.id);
        if (user) {
            user.progress[course] = "started";
            await user.save();
        }
        console.log(req.user.id)

    res.json({
        course,
        message: "You have successfully started"
    });

})

export {getResult, changeStatusInprogress, changeStatusStarted}