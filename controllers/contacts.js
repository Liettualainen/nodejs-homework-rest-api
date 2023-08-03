// const Joi = require('joi');
const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
  const { id: owner } = req.user;
  const allContacts = await Contact.find({owner});
  res.status(200).json(allContacts);
}

const getContactById = async (req, res) => {
    const { id} = req.params;
  const contactID = await Contact.findById(id);
    if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json(contactID)
}

const addContact = async (req, res) => {
    const { id: owner } = req.user;
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
}

const removeContact = async (req, res) => {
     const { id } = req.params;
    const contactID = await Contact.findByIdAndDelete(id);
    if (!contactID) {
      throw HttpError(404, 'Not found id');
    }
    res.status(200).json("contact deleted")
}

const updateContact = async (req, res) => {
      const { id } = req.params;
  const contactID = await Contact.findByIdAndUpdate(id, req.body, {new: true});
     if (!contactID) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contactID)
}

const favoriteAdd = async (req, res) => {
      const { id } = req.params;
  const contactID = await Contact.findByIdAndUpdate(id, req.body, {new: true});
     if (!contactID) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contactID)
}


module.exports = {
    allContacts:ctrlWrapper(allContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    removeContact:ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
   favoriteAdd: ctrlWrapper(favoriteAdd),
    
}