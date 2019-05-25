import BootBot from 'bootbot';
import { lookup } from './lib/urban-dictionary';
const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_ACCESS_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

bot.on('message', async (payload, chat) => {
  console.log('init', payload.message.text);
  const definition = await lookup(payload.message.text);
  console.log(definition);
  if (definition.valid) {
    await chat.say(`🤖🖖`);
    await chat.say({
      text: definition.definition,
      quickReplies: definition.related
    });
  } else {
    await chat.say(`Oops. Couldn't find that word :(`);
  }
});

bot.start();
