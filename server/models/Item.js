const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    imgUrl: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// export model user with UserSchema
module.exports = mongoose.model("Item", ItemSchema);
