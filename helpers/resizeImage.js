const Jimp = require("jimp");
const  HttpError  = require("./HttpError");


const resizeImage = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    await image.resize(250, Jimp.AUTO);
    await image.writeAsync(imagePath);
  } catch (error) {
    throw HttpError(404);
  }
};


module.exports = resizeImage;