import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,
          validate: [validator.isEmail, "Enter valid email"],},
    password: { type: String, required: true },
    phone: { type: String, required: true,
        validate: [validator.isMobilePhone, "Enter valid phone number"], 
        unique: true,
     },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user",
        required: true
    },
    age: {type: Number, required: true},
    progress: {
        preamble: { type: String, enum: ["started", "inprogress", "completed"], },
        "fundamental-rights": { type: String, enum: ["started", "inprogress", "completed"], },
        "directive-principles": { type: String, enum: ["started", "inprogress", "completed"], },
        "fundamental-duties": { type: String, enum: ["started", "inprogress", "completed"], }
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;