const { default: axios } = require("axios");

exports.handler = async function(event, context) {
  try {
    const { words, buttonText } = JSON.parse(event.body);
    return axios
      .post("https://jsonbox.io/box_23ae45336b05b999ce70", {
        words,
        buttonText,
      })
      .then((resp) => ({ statusCode: 200, body: JSON.stringify({ resp }) }))
      .catch((e) => ({ statusCode: 500, body: e.toString() }));
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
};
