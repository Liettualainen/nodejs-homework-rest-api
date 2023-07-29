const express = require('express');
const router = express.Router();
const ctr = require('../../controllers/contacts')

const { validateBody, isValidId } = require("../../middlewares")
const { schemas } = require("../../models/contact")

router.get("/", ctr.allContacts);

router.get("/:id", isValidId, ctr.getContactById);

router.post("/", validateBody(schemas.addSchema), ctr.addContact);

// router.delete("/:id", isValidId,ctr.removeContact);

router.put("/:id", isValidId,validateBody(schemas.addSchema), ctr.updateContact);

router.patch("/:id/favorite", isValidId, validateBody(schemas.favoriteAddSchema), ctr.favoriteAdd);

module.exports = router