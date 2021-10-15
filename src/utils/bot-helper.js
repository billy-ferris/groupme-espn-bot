const axios = require("axios");
const { BASE_GROUPME_ENDPOINT } = require("../consts");
const { BOT_ID } = process.env;

const postMessage = async (message) => {
  const url = `${BASE_GROUPME_ENDPOINT}/bots/post`;
  if (typeof message !== "string") {
    throw new Error("Message must be a string.");
  }
  const data = {
    bot_id: BOT_ID,
    text: message,
  };
  await axios
    .post(url, data)
    .then(() => console.info("Message successfully posted:", data.text))
    .catch((error) => console.error("Error posting message:", error.message));
};

module.exports = {
  postMessage,
};
