const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {handleMongooseError}=require("../helpers/")

const contactSchema = new Schema({
    name: {
        type: String, required:true,
    },
        email:  {
        type: String,required:true,
    },
        phone:  {
        type: Number, required:true,
    },
    favorite: {
        type: Boolean, default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number().required(),
    favorite: Joi.boolean(),
})
const favoriteAddSchema = Joi.object({
    favorite: Joi.boolean().required(),
})
const schemas = {
    addSchema, favoriteAddSchema,
}

module.exports = { Contact, schemas};