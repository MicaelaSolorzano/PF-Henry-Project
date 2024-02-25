const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  description: String,
  score: Number,
  client: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
});

const hotelSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    details: { String, required: true },
    address: { String, required: true },
    contact: {
      phone: Number,
      mail: String,
    }
  });

const roomSchema = new Schema({
  hotel_id: {hotelSchema},
  description: { type: String, required: true },
  typeOfRoom: { type: String, required: true },
  services: [String],
  price: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  images: [String],
  contact: {
    phone: Number,
    mail: String,
  },
  num_rooms: { type: Number, required: true },
  isFav: { type: Boolean, defaultValue: false },
  review: [reviewSchema],
  totalScore: {type: Number}
});

const Room = model("Room", roomSchema);

module.exports = {
  Room,
};
