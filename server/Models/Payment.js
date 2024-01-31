const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Payment = new Schema({
  product: {
    type: String,
  }, 
  productLink: {
    type: String,
  }, 
  firtname: {
    type: String,
  },
  phone: {
    type: Number
  }

});

module.exports = mongoose.model("Payment", Payment);