const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coordinatesSchema = new Schema({
  x: {
    type: Number,
    required: true,
    unique: false,
  },
  y: {
    type: Number,
    required: true,
    unique: false,
  },
});

const Coordinates = mongoose.model('Coordinates', coordinatesSchema);

module.exports = Coordinates;