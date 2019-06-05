import BootBot from 'bootbot';
import { lookup, random } from './lib/urban-dictionary';
import { sendGreeting, sendDefinition } from './lib/copy';

const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_ACCESS_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

bot.setGetStartedButton('GET_STARTED');
bot.setGreetingText('Your one stop for quick urban dictionary lookups.');
bot.on('postback:GET_STARTED', async (payload, chat) => sendGreeting(chat));
bot.on('message', async (payload, chat, data) => {
  let definition;
  if (payload.message.quick_reply && payload.message.quick_reply.payload === 'RANDOM') {
    definition = await random();
  } else {
    definition = await lookup(payload.message.text);
  }
  await sendDefinition(chat, definition);
});

bot.start(process.env.PORT);
