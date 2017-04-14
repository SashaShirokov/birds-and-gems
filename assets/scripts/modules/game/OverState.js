class Over extends Phaser.State {
   preload() {
      this.game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
      this.game.load.spritesheet("bird", "images/main/cuteBird8.png", 78, 70, 4);
   }
    create() {
        // Buttons
        this.buttonPlayAgain = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "buttons", this.replay, this, 0, 1, 0);
        this.buttonPlayAgain.anchor.set(0.5, 0);

        // Bird
        this.bird = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "bird");
        this.bird.anchor.set(0.5, 0.7);
        this.bird.animations.add('fly', [0, 1, 2, 3], 15, true);
        this.bird.animations.play('fly');
        this.bird.scale.x = -1;
        this.game.stage.backgroundColor = "#26C9FF";

        this.titleText = this.game.add.text(this.game.world.centerX, 60, "Don't give up",{ font: "50px Gloria+Hallelujah", fill: "#FF9100", stroke: "#222222", strokeThickness: 4, align: "center" });
        this.titleText.anchor.set(0.5, 0.2);
    }
    replay() {
        this.game.state.start("Level1");
    }
    update() {
    }
}

export default Over;
