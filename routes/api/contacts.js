const express = require('express');

const ctr = require('../../controllers/contacts')

const { validateBody, isValidId, authenticate } = require("../../middlewares")

const { schemas } = require("../../models/contact")


const router = express.Router();

router.get("/", authenticate, ctr.allContacts);

router.get("/:id", authenticate, isValidId, ctr.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctr.addContact);

router.delete("/:id", authenticate, isValidId,ctr.removeContact);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctr.updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.favoriteAddSchema), ctr.favoriteAdd);



module.exports = router;