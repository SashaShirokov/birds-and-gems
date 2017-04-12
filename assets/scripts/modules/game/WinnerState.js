class Winner extends Phaser.State {
   preload() {
        this.game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
        this.game.load.image("goblet", "images/main/goblet.png")
        this.game.load.spritesheet("soundButtons", "images/ui/soundButtons-round1.png", 44, 44, 4);
        this.game.load.audio("backgroundMusic", "sounds/background.mp3");
   }
    create() {
        // Variables
        this.musicPlaying = false;
        this.musicOn = true;

        this.buttonStart = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "buttons", this.startGame, this, 6, 7, 6);
        this.buttonStart.anchor.set(0.5, 0.2);

        // sounds
        this.backgroundMusic = this.game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;

        // Add goblet
        this.goblet = this.game.add.sprite(this.game.world.centerX, 180, "goblet");
        this.goblet.anchor.set(0.5, 0.5);
        this.goblet.scale.y = .3;
        this.goblet.scale.x = .3;


        this.inText = this.game.add.text(this.game.world.centerX, 30, "Congratulation!!!  You are the BEST!!!", {
            font: "50px Gloria+Hallelujah"
            , fill: "#2f5572"
            , align: "center" });
        this.inText.anchor.set(0.5, 0.5);

        // Sound buttons
        this.btnMusic = this.game.add.sprite(100, 150, "soundButtons");
        this.btnMusic.frame = 2;

        this.setListeners();
        this.updateButtons();
        this.updateMusic();

    }

    setListeners() {
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

    startGame() {
        this.backgroundMusic.stop();
        this.game.state.start("Title");
    }

    update() {
    }
}

export default Winner;
