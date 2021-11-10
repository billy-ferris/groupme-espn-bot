import axios from "axios";
import { BASE_GROUPME_ENDPOINT } from "../consts";

const { BOT_ID } = process.env;

const postMessage = async (message: string): Promise<void> => {
  const url = `${BASE_GROUPME_ENDPOINT}/bots/post`;
  const data = {
    bot_id: BOT_ID,
    text: message,
  };
  await axios
    .post(url, data)
    .then(() => console.info("Message successfully posted:", data.text))
    .catch((error) => console.error("Error posting message:", error.message));
};

export default postMessage;
