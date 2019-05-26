const WORDS = [
  'Lit',
  'Panda',
  'GOAT',
  'Starboy',
  'Trolling',
  'Hipster',
  'Woke',
  'Dab',
  'Shook',
  'Salty',
  'Receipts',
  'Beat',
  'Kiki',
  'Yeet',
  'Crapella',
  'Badassery',
  'Askhole',
  'Beer me',
  'Bromance',
  'Cyberslacking',
  'Crackberry'
];

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default () => shuffleArray(WORDS);
