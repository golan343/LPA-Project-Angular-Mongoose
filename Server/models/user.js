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
        index: true,
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
        index: true,
        required: [true, "city is missing"]
    } ,
    street: {
        type: String,
        required: [true, "street details is missing"]
    },
    settlement: {
        type: String,
    },
    country: {
        type: String,
        index: true,
        required: [true, "country is missing"]
    },
    phone: {
        type: String,
    },
    birthDate: {
        type: Date,
        index: true,
        required: [true, 'birth day is missing']
    },
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    unique: {
        type: Boolean
    },
    state:{
        type:String
    },
    postalCode:{
        type:String
    },
    profileName:{
        type:String
    },
    token: { 
        type:String
    },
    expiredToken: { 
        type: Number
    },
    sectorNumber:{
        type:Number,
    },
    loginDate: {
        index: true,
        type: Date
    },
    registrationDate: {
        index: true,
        type: Date
    },
    winingOffers: {
        index: true,
        type: Number
    },
    loosingOffers: {
        index: true,
        type: Number
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreatedBy"
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

UserSchema.virtual("user", {
    ref: "CreatedBy",
    localField: "createdBy",
    foreignField: "_id",
    justOne: true
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;