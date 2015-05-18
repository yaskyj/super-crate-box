window.onload = function () {
  'use strict';

  var game;
    //, ns = window['super-crate-box'];
  var mainState = {
    preload: function() {
      game.load.image('player', 'assets/player.png');
    },

    create: function() {
      game.stage.backgroundColor = '#3498db';
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(this.player);
      this.player.body.gravity.y = 500;
      this.cursor = game.input.keyboard.createCursorKeys();
    },

    update: function() {
      this.movePlayer();
    },

    movePlayer: function() {
      if (this.cursor.left.isDown) {
        this.player.body.velocity.x = -200;
      }
      else if (this.cursor.right.isDown) {
        this.player.body.velocity.x = 200;
      }
      else {
        this.player.body.velocity.x = 0;
      }

      if (this.cursor.up.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -320;
      }
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
