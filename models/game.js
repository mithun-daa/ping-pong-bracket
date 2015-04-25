'use strict';

function Game(obj) {
    this._id = obj._id;
    this.player1 = obj.player1;
    this.player2 = obj.player2;
    this.on = obj.on;
    this.winner = obj.winner;
    this.parentId = obj.parentId;
}

module.exports = Game;