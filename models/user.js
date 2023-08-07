const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require("../helpers/")

const emailREgexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailREgexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
    },
    token: {
    type: String,
    default: "",
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailREgexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
})
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailREgexp).required(),
    password: Joi.string().min(6).required(),
})
const schemas = {
    registerSchema, loginSchema,
}

module.exports = { User, schemas};
