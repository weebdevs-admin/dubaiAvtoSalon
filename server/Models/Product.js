const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
  img: {
    type: String,
  }, 
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  desc: {
    type: String,
  },
  year: {
    type: String,
  },
  type1: {
    type: String,
  },
  type2: {
    type: String,
  },
  type3: {
    type: String,
  },
  type4: {
    type: String,
  },
  price: {
    type: Number,
  },

});

module.exports = mongoose.model("Product", Product);