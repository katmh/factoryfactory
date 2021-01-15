const { default: axios } = require("axios");

exports.handler = async function(event) {
  const { words, buttonText } = JSON.parse(event.body);
  try {
    return axios
      .post("https://jsonbox.io/box_23ae45336b05b999ce70", {
        words,
        buttonText,
      })
      .then((res) => ({ statusCode: 200, body: JSON.stringify(res.data) }))
      .catch((e) => ({ statusCode: 503, body: e.toString() }));
  } catch (e) {
    return { statusCode: 501, body: e.toString() };
  }
};
