const mongoose = require('mongoose');
const moment = require('moment');


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