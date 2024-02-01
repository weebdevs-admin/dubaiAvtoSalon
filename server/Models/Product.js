const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
  img: {
    type: String,
  }, 
  img2: {
    type: String,
  }, 
  img3: {
    type: String,
  }, 
  img4: {
    type: String,
  }, 
  img5: {
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
  km: {
    type: String,
  },
  fuel: {
    type: String,
  },
  price: {
    type: Number,
  },

});

module.exports = mongoose.model("Product", Product);