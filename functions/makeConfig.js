const { default: axios } = require("axios");

var crypto = require("crypto");

exports.handler = async function(event, context) {
  // TODO: see if there's already an item with this config
  // if so, return that item's ID

  const { words, buttonText } = JSON.parse(event.body);

  // generate 12-digit ID
  const id = crypto.randomBytes(6).toString("hex");

  // send POST request to write new config object
  axios.post("https://jsonbox.io/box_23ae45336b05b999ce70", {
    _id: id,
    words,
    buttonText,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: id }),
  };
};
