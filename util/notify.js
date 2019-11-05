const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

async function push(conversationId = process.env.DEV_CHANNEL_ID, message) {
  const res = await web.chat.postMessage({ channel: conversationId, text: message });
  console.log('Message sent: ', res.ts);
}

module.exports = { push }
