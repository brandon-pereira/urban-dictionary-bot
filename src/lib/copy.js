import suggestions from './suggestions';
const MAX_QUICK_REPLIES = 11;

export const sendGreeting = async chat => {
  await chat.say(`Hello!`);
  await chat.say(`I'm the Urban Dictionary chat bot.`);
  await chat.say(`Ask me any word and I'll give you the street definition!`);
  await chat.say({
    text: `Alternatively, try one of the following.`,
    quickReplies: suggestions().slice(0, MAX_QUICK_REPLIES)
  });
};

export const sendDefinition = async (chat, definition) => {
  if (definition && definition.valid && !definition.error) {
    if (definition.random) {
      await chat.say(`Your random word is "*${definition.word}*". It's definition is:`);
    } else {
      await chat.say(`The definition of "*${definition.word}*" is:`);
    }
    await chat.say({
      text: definition.definition,
      quickReplies: [
        {
          title: '🎲',
          payload: 'RANDOM'
        },
        ...definition.related,
        ...suggestions()
      ].slice(0, MAX_QUICK_REPLIES)
    });
  } else if (!definition.valid) {
    await chat.say(`Oops. Couldn't find that word :(`);
  } else {
    await chat.say(`Oops. We hit a snag on our end. We'll look into it`);
  }
};
