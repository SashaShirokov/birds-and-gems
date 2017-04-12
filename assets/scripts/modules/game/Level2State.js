class Level2 extends Phaser.State {
    preload() {
        this.game.load.spritesheet("bird", "images/main/bird3.png", 73, 64, 6);
        this.game.load.image("background", "images/main/bg8.jpg");
        this.game.load.spritesheet("fruit", "images/main/gems3.png", 50, 52, 6);
        this.game.load.image("goal", "images/main/wish.png");
        this.game.load.image("bar1", "images/life/bar1.png");
        this.game.load.image("bar2", "images/life/bar2.png");
        this.game.load.spritesheet("soundButtons", "images/ui/soundButtons-round1.png", 44, 44, 4);
        this.game.load.audio("backgroundMusic", "sounds/background.mp3");
    }

    create() {
        // Variables
        this.top = 0;
        this.score = 0;
        this.bottom = this.game.height - 90;
        this.musicPlaying = false;
        this.musicOn = true;

        // Start physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Bird
        this.bird = this.game.add.sprite(0, 0, "bird");
        this.bird.animations.add('fly', [0, 1, 2, 3], 15, true);
        this.bird.animations.play('fly');

        // sounds
        this.backgroundMusic = this.game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;

        // Background
        this.background = this.game.add.tileSprite(0, this.game.height-480, this.game.width, 480, 'background');

        this.bird.bringToTop();
        this.bird.y = this.top;
        this.background.autoScroll(-100, 0);

        // Fruit
        this.fruit = this.game.add.group();
        this.fruit.createMultiple(40, "fruit");
        this.fruit.setAll("checkWorldBounds", true);
        this.fruit.setAll("outOfBoundsKill", true);

        // Text
        this.scoreText = this.game.add.text(this.game.world.centerX, this.top + 60, "0");
        this.scoreText.fill = "#d59541";
        this.scoreText.fontSize = 32;
        this.scoreText.anchor.set(0.5, 0.3);

        this.scoreLabel = this.game.add.text(this.game.world.centerX, this.top + 20, "Level 2");
        this.scoreLabel.fill = "#E8D900";
        this.scoreLabel.fontSize = 32;
        this.scoreLabel.anchor.set(-2.55, 0.3);

        // Lifes
        this.bar2 = this.game.add.image(0, 0, "bar2");
        this.bar1 = this.game.add.image(0, 0, "bar1");
        this.lifeGroup = this.game.add.group();
        this.lifeGroup.add(this.bar2);
        this.lifeGroup.add(this.bar1);
        this.lifeGroup.scale.y = 4;
        this.lifeGroup.scale.x = 4;
        this.lifeGroup.fixedToCamera = true;
        this.lifeGroup.cameraOffset.setTo(this.game.width / 2 - this.lifeGroup.width / 2, 15);

        // Wishes
        this.goalGroup = this.game.add.group();
        this.goal = this.game.add.sprite(0, 0, "goal");
        this.want = this.game.add.sprite(36, 26, "fruit");
        this.goalGroup.add(this.goal);
        this.goalGroup.add(this.want);
        this.goalGroup.scale.y = .4;
        this.goalGroup.scale.x = .4;
        this.goalGroup.x = 50;

        // Sound buttons
        this.btnMusic = this.game.add.sprite(10, 10, "soundButtons");
        this.btnMusic.frame = 2;

        // Enable bird to have gravity
        this.game.physics.enable([this.bird, this.fruit], Phaser.Physics.ARCADE);
        this.bird.body.gravity.y = 350;
        this.bird.body.immovable = true;

        this.game.world.bringToTop(this.lifeGroup);

        this.setListeners();
        this.resetGoal();
        this.updateButtons();
        this.updateMusic();
    }
    setListeners() {
        this.game.time.events.loop(Phaser.Timer.SECOND, this.fireFruit, this);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.life, this);
        this.btnMusic.inputEnabled = true;
        this.btnMusic.events.onInputDown.add(this.toggleMusic, this);
    }

    toggleMusic() {
        this.musicOn = !this.musicOn;
        this.updateButtons();
        this.updateMusic();
    }

    updateMusic() {
        if (this.musicOn === true) {
          if (this.musicPlaying === false) {
              this.musicPlaying === true;
              this.backgroundMusic.play();
          }
        } else {
            this.musicPlaying === false
            this.backgroundMusic.stop();
        }
    }

    updateButtons() {
      if (this.musicOn === true) {
          this.btnMusic.frame = 2;
      } else {
          this.btnMusic.frame = 3;
      }
    }

    life() {
        if (this.bar1.width > 1) {
            this.bar1.width --;
        } else {
            this.backgroundMusic.stop();
            this.game.state.start("GameOver");
        }
    }

    fireFruit() {
        let fruit = this.fruit.getFirstDead();
        let yy = this.game.rnd.integerInRange(0, this.game.height - 120);
        let xx = this.game.width - 100;
        let type = this.game.rnd.integerInRange(0, 5);

        fruit.frame = type;
        fruit.reset(xx, yy);
        fruit.enabled = true;
        fruit.body.velocity.x = - 240;
    }

    flap() {
        this.bird.body.velocity.y = -250;
    }

    onSwallow(bird, fruit) {
        if (this.want.frame === fruit.frame) {
            fruit.kill();
            this.resetGoal();
            this.score ++;
            this.bar1.width = this.bar1.width + 5;
            if (this.score === 7) {
                this.backgroundMusic.stop();
                this.game.state.start("Stage2");
            }
            this.scoreText.text = this.score;
        } else {
            fruit.kill();
            this.bar1.width = this.bar1.width - 5;
        }
    }

    resetGoal() {
        let goals = this.game.rnd.integerInRange(0, 5);
        this.want.frame = goals;
    }

    update() {
        this.game.physics.arcade.collide(this.bird, this.fruit, null, this.onSwallow, this);
        this.goalGroup.y = this.bird.y - 45;
        this.goalGroup.x = this.bird.x;
        if (this.game.input.activePointer.isDown) {
            this.flap();
        }
        if (this.bird.y < this.top) {
            this.bird.y = this.top;
            this.bird.body.velocity.y = 0;
        }
        if (this.bird.y > this.bottom) {
            this.bird.y = this.bottom;
            this.bird.body.gravity.y = 0;
        } else {
            this.bird.body.gravity.y = 350;
        }
    }
}

export default Level2;
