const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('America/Bogota');

const LogSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      default: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    Data: {
      type: Object,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('log', LogSchema);