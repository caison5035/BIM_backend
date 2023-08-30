const httpStatus = require("http-status");
const bimModel = require("./../models/bim.model");
const cloudinary = require("./../utils/cloudinary");

const upload = async (req, res) => {
  const { body } = req;

  const response = {
    status: httpStatus.OK,
    data: null,
    error: null,
  };
  try {
    // Upload the file to the server temporarily
    const file = req.files.file;
    const tempFilePath = appRoot + "/../public/uploads/" + file.name;
    await file.mv(tempFilePath);

    // Upload the file to Cloudinary
    const fileUploadedResponse = await cloudinary.uploader.upload(tempFilePath);

    const bimObject = {
      name: file.name,
      url: fileUploadedResponse.secure_url,
      map: {
        longitude: body.longitude || "",
        latitude: body.latitude || "",
      },
    };

    const result = await bimModel.create(bimObject);
    response.data = result;
  } catch (error) {
    console.log(error);
    response.error = error;
    response.data = null;
    response.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
  return res.send(response);
};

const search = async (req, res) => {
  const response = {
    status: httpStatus.OK,
    data: null,
    error: null,
  };
  try {
    const { query } = req;
    const result = await bimModel.find({
      name: { $regex: query.search, $options: "i" },
    });
    response.data = result;
  } catch (error) {
    console.log(error);
    response.error = error;
    response.data = null;
    response.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
  res.send(response);
};

const list = async (req, res) => {
  const response = {
    status: httpStatus.OK,
    data: null,
    error: null,
  };
  const result = await bimModel.find();
  response.data = result;
  res.send(response);
};

module.exports = {
  upload,
  search,
  list,
};
