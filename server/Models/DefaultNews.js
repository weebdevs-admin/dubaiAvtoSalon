const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DefaultNews = new Schema({
  img: {
    type: String,
  }, 
  title: {
    type: String,
  },
  desc: {
    type: String,
  }

});

module.exports = mongoose.model("DefaultNews", DefaultNews);