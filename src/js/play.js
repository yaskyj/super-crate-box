'use strict';
var playState = {
  create: function() {
    this.cursor = game.input.keyboard.createCursorKeys();

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 500;

    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.enemies.createMultiple(10, 'enemy');

    this.coin = game.add.sprite(60, 140, 'coin');
    game.physics.arcade.enable(this.coin);
    this.coin.anchor.setTo(0.5, 0.5);

    this.scoreLabel = game.add.text(30, 30, 'score: 0',
      {font: '18px Arial', fill: '#fff'});
    game.global.score = 0;

    this.createWorld();
    game.time.events.loop(2200, this.addEnemy, this);
  },

  takeCoin: function () {
    game.global.score += 5;
    this.scoreLabel.text = 'score: ' + game.global.score;
    this.updateCoinPosition();
  },

  playerDie: function () {
    game.state.start('menu');
  },

  update: function() {
    game.physics.arcade.collide(this.player, this.walls);
    this.movePlayer();
    if (!this.player.inWorld) {
      this.playerDie();
    }
    game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
    game.physics.arcade.collide(this.enemies, this.walls);
    game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
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
  },

  createWorld: function() {
    // Create our wall group with Arcade physics
    this.walls = game.add.group();
    this.walls.enableBody = true;
    // Create the 10 walls
    game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
    game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
    game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
    game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
    game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
    game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
    game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
    game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right
    var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls); middleTop.scale.setTo(1.5, 1);
    var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls); middleBottom.scale.setTo(1.5, 1);
    // Set all the walls to be immovable
    this.walls.setAll('body.immovable', true);
  },

  updateCoinPosition: function() {
    // Store all the possible coin positions in an array
    var coinPosition = [
      {x: 140, y: 60}, {x: 360, y: 60}, // Top row
      {x: 60, y: 140}, {x: 440, y: 140}, // Middle row
      {x: 130, y: 300}, {x: 370, y: 300} // Bottom row
    ];
    // Remove the current coin position from the array
    // Otherwise the coin could appear at the same spot twice in a row
    for (var i = 0; i < coinPosition.length; i++) {
      if (coinPosition[i].x === this.coin.x) {
        coinPosition.splice(i, 1);
      }
    }
    // Randomly select a position from the array
    var newPosition = coinPosition[ game.rnd.integerInRange(0, coinPosition.length-1)];
    // Set the new position of the coin
    this.coin.reset(newPosition.x, newPosition.y);
  },

  addEnemy: function() {
    // Get the first dead enemy of the group
    var enemy = this.enemies.getFirstDead();
    // If there isn't any dead enemy, do nothing
    if (!enemy) {
      return;
    }
    // Initialise the enemy
    enemy.anchor.setTo(0.5, 1);
    enemy.reset(game.world.centerX, 0);
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
    enemy.body.bounce.x = 1;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true; }
};