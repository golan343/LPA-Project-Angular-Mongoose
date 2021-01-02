const mongoose = require('mongoose');

// user Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true,  "is missing."],
        trim: true,
        validate: {
            validator: value => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value),
            message: "email must be valid!"
        }
    },
    password: {
        type: String,
        required: [true, "is missing."],
    },

    firstName: {
        type: String,
        required: [true, "is missing"],
        minlength: [3, "must be minimum 3 charts"]
    },
    lastName: {
        type: String,
        required: [true, "is missing"],
        minlength: [3, "must be minimum 3 charts"]
    },

    city: {
        type: String,
        required: [true, "is missing"]
    } ,
    street: {
        type: String,
        required: [true, "is missing"]
    },
    country: {
        type: String,
        required: [true, "is missing"]
    },
    birthDate: {
        type: Date,
        required: [true, 'is missing']
    },
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }

    
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

UserSchema.virtual("role", {
    ref: "Role",
    localField: "roleId",
    foreignField: "_id",
    justOne: true
});


const User = mongoose.model("User", UserSchema, "users");


module.exports = User;

