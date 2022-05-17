const Item = require('../models/itemModel');

// Find item and update | if not exist, create
exports.saveItem = async (item_info) => {
  try {
    const splitArr = item_info.item.nft_id.split('/');
    const item = await Item.findOne({ "tokenId": splitArr[2] });
    if (item) {
      const result = await Item.findOneAndUpdate(
        { "tokenId": splitArr[2] },
        {
          chain: splitArr[0],
          tokenId: splitArr[2],
          contractAddress: splitArr[1],
          slug: item_info.collection.slug,
          ownerAddress: item_info.maker.address
        },
        {
          new: true,
          upsert: true
        }
      );
      console.log("Updated", result);
    } else {
      const item = new Item({
        chain: splitArr[0],
        tokenId: splitArr[2],
        contractAddress: splitArr[1],
        slug: item_info.collection.slug,
        ownerAddress: item_info.maker.address
      });
      const result = await item.save();
      console.log("Created", result);
    }
  } catch (error) {
    console.log(error);
  }
}