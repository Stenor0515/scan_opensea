const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  chain: {
    type: String,
    required: true
  },
  tokenId: {
    type: String,
    required: true
  },
  contractAddress: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  ownerAddress: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Item", ItemSchema);