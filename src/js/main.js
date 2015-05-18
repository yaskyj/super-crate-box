window.onload = function () {
  'use strict';

  var game
    , ns = window['super-crate-box'];

  game = new Phaser.Game(640, 480, Phaser.AUTO, 'super-crate-box-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');
};
