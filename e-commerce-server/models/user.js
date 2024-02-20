const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
      required: false,
      default: "none",
    },
    city: {
      type: String,
      required: false,
      default: "none",
    },
    province: {
      type: String,
      required: false,
      default: "none",
    },
    postalcode: {
      type: String,
      required: false,
      default: "none",
    },
    contact: {
      type: String,
      required: false,
      default: "none",
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
