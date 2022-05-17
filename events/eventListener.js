const { OpenSeaStreamClient, Network } = require('@opensea/stream-js');
const { WebSocket } = require('ws');
const axios = require('axios');
require('dotenv').config();

const { saveItem } = require('../controllers/itemController');

const client = new OpenSeaStreamClient({
  network: Network.MAINNET,
  token: process.env.OPENSEA_API_KEY,
  connectOptions: {
    transport: WebSocket
  }
});

client.connect();


client.onItemListed('*', async (event) => {
  try {
    const item_info = event.payload;
    await saveItem(item_info);
  } catch (error) {
    console.log(error)
  }
});


// const collection_stats = await axios.get(
//   `https://api.opensea.io/collection/${collection_slug}/stats/`,
//   {
//     headers: {
//       'x-api-key': process.env.OPENSEA_API_KEY
//     }
//   });
