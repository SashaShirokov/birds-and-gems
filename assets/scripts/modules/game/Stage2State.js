class Stage2 extends Phaser.State {
     preload() {
          this.game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
          this.game.load.spritesheet("bird", "images/main/bird2.png", 91, 64, 8);
          this.game.load.spritesheet("fruit", "images/main/fruit2.png", 55, 55, 10);
     }

      create() {
          this.buttonStart = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "buttons", this.startGame, this, 6, 7, 6);
          this.buttonStart.anchor.set(0.5, 0);

          // Bird
          this.bird = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "bird");
          this.bird.anchor.set(0.5, 1);
          this.bird.animations.add('fly', [0, 1, 2, 3], 12, true);
          this.bird.animations.play('fly');
          this.game.stage.backgroundColor = "#26C9FF";

          this.inText = this.game.add.text(this.game.world.centerX, 30, "Great job!!", {
              font: "50px Gloria+Hallelujah"
              , fill: "#2f5572"
              , align: "center" });
          this.inText.anchor.set(0.5, 0.2);

      }

      startGame() {
          this.game.state.start("Level3");
      }
}

export default Stage2;
