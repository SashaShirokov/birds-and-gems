class Title extends Phaser.State {
    preload() {
      if (screen.width < 1500) {
          this.game.scale.forceOrientation(true, false);
      }
      this.game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
      this.game.load.spritesheet("bird", "images/main/bird.png", 95.5, 91.5, 16);
      this.game.load.spritesheet("bird2", "images/main/bird2.png", 91, 64, 8);
      this.game.load.spritesheet("bird3", "images/main/bird3.png", 73, 64, 6);
      this.game.load.spritesheet("soundButtons", "images/ui/soundButtons-round1.png", 44, 44, 4);
      this.game.load.audio("backgroundMusic", "sounds/background.mp3");
    }
    create() {
      // Variables
      this.musicPlaying = false;
      this.musicOn = true;

      // Buttons
      this.buttonStart = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "buttons", this.startGame, this, 6, 7, 6);
      this.buttonStart.anchor.set(0.5, 0);

      // sounds
      this.backgroundMusic = this.game.add.audio("backgroundMusic");
      this.backgroundMusic.volume = .5;
      this.backgroundMusic.loop = true;

      // Title
      this.bird = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "bird");
      this.bird.anchor.set(2, 1);
      this.bird.animations.add('fly', [0, 1, 2, 3], 12, true);
      this.bird.animations.play('fly');

      this.bird2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "bird2");
      this.bird2.anchor.set(-1, 1);
      this.bird2.animations.add('fly', [0, 1, 2, 3], 12, true);
      this.bird2.animations.play('fly');

      this.bird3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "bird3");
      this.bird3.anchor.set(0.5, 1);
      this.bird3.animations.add('fly', [0, 1, 2, 3], 12, true);
      this.bird3.animations.play('fly');

      this.game.stage.backgroundColor = "#26C9FF";

      this.titleText = this.game.add.text(this.game.world.centerX, 60,
      "Birds & Gems", {
          font: "50px Gloria+Hallelujah"
          , fill: "#2f5572"
          , align: "center" });
      this.titleText.anchor.set(0.53, 0.5);

      // Sound buttons
      this.btnMusic = this.game.add.sprite(70, 40, "soundButtons");
      this.btnMusic.frame = 2;

      this.setListeners();
      this.updateButtons();
      this.updateMusic();
    }
    setListeners() {
      if (screen.width < 1500) {
          this.game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
          this.game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
      }
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
    wrongWay() {
        document.getElementById("wrongWay").style.display = "block";
    }

    rightWay() {
        document.getElementById("wrongWay").style.display = "none";
    }
    startGame() {
        this.backgroundMusic.stop();
        this.game.state.start("Level1");
    }

    update() {

    }
}

export default Title;
