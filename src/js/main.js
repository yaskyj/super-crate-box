window.onload = function () {
  'use strict';

  var game;
    //, ns = window['super-crate-box'];
  var mainState = {
    preload: function() {

    },

    create: function() {
      game.stage.backgroundColor = '#3498db';
      game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update: function() {

    }
  };
  game = new Phaser.Game(500, 340, Phaser.AUTO, 'super-crate-box-game');
  game.state.add('main', mainState);
  game.state.start('main');
  //game.state.add('boot', ns.Boot);
  //game.state.add('preloader', ns.Preloader);
  //game.state.add('menu', ns.Menu);
  //game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */

  //game.state.start('boot');
};
