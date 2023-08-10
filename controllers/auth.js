const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const { nanoid} = require("nanoid");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper, resizeImage, sendEmail } = require("../helpers");
const { SECRET_KEY, BASE_URL } = process.env;
const avatarsDir = path.join(__dirname,"../" ,"public", "avatars")

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    }
    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
}

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare){
        throw HttpError(401, "Email or password invalid");
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })
}

const getCurrent = async(req, res) => {
    const { email, subscription } = req.user;
    res.status(401).json({
        email,
        subscription,
    })

}

const logout = async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
     res.json({
              message: "Logout success"
    })
}

const updateSubscr = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(204).json({
    message: "Subscription updated successfully",
  });
};


const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    await resizeImage(resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscr: ctrlWrapper(updateSubscr),
    updateAvatar: ctrlWrapper(updateAvatar),
}