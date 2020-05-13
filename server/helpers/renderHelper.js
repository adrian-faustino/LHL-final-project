module.exports = (_id, Lobby) => {
  Lobby.findById(_id, (err, lobbyObj) => {
    console.log('Lobby: ->' , lobbyObj);
  })
}