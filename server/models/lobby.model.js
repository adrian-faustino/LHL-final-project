const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lobbySchema = new Schema({
  lobbyID: {type: String, required: true, unique: true, trim: true},
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
}, {
  timestamps: true
})

const Lobby = mongoose.model('Lobby', lobbySchema);

module.exports = Lobby;