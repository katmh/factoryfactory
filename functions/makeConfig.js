exports.handler = async function(event) {
  try {
    return fetch("https://jsonbox.io/box_23ae45336b05b999ce70", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.body,
    })
      .then((res) => res.json())
      .then((data) => ({ statusCode: 200, data }))
      .catch((e) => ({ statusCode: 503, e }));
  } catch (e) {
    return { statusCode: 501, e };
  }
};
