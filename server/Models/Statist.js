const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Statist = new Schema({
  established: {
    type: String,
  },
  teachers: {
    type: String,
  },
  exteacher: {
    type: String,
  },
  students: {
    type: String,
  },
  winners: {
    type: String,
  }

});

module.exports = mongoose.model("Statist", Statist);