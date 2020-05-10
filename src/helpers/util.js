// returns a random integer inclusize of min and max
const randomNumAllInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns a 6 digit alphanumeric all capital ID
const generateLobbyID = (ID_length) => {
  // List does not include 0 or O;
  const ALPHA_NUM = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  let id = ''

  // push random letters/numbers into the array until desired ID length
  for (let i = 0; i < ID_length; i++) {
    const randomIndex = randomNumAllInclusive(0, ALPHA_NUM.length - 1);
    id += ALPHA_NUM[randomIndex]
  }

  return id;
}

// set up error listener
const errorListener = (socket) => {
  socket.on('success', msg => console.log('Success:', msg));
  socket.on('err', err => console.log('Error:', err));
};


const util = {
  randomNumAllInclusive,
  generateLobbyID,
  errorListener,
};

export default util;