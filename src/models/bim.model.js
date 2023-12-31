const mongoose = require('mongoose');

const bimSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    map : {
        longitude: {
          type: Number,
          required: true,
        },
     
        latitude: {
          type: Number,
          default: false,
        },
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef BIM
 */
const BIM = mongoose.model('bim', bimSchema);

module.exports = BIM;