const httpStatus = require('http-status');
const bimModel = require('./../models/bim.model');

const upload = async (req, res) => {
    const { body } = req;
    console.log("Request body: ", body , " Files " , req.files);
    res.send("ok")
    // const result = await bimModel.create(body);
    // res.send(result);
};
  
const tag = async (req, res) => {
    const { id, longitude , latitude  } = req.body;
    const result = await bimModel.findById(id);
    result.map = {
        longitude,
        latitude
    };
    result.save();

    res.send(result);
};
  
module.exports = {
    upload,
    tag
}