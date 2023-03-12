import Cloudinary from "./Cloudinary.js";

export const upload = async (folder, image) => {
  const result = await Cloudinary.uploader.upload(image, {
    folder: folder,
    crop: "scale",
  });
  return result;
};

export const destroyImage = async (image) => {
  Cloudinary.uploader.destroy(image, function (error, result) {
    console.log(result, error);
  });
};
