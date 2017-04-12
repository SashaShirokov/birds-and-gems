class GameOver extends Phaser.State {
   preload() {
        this.game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
        this.game.load.spritesheet("fruit", "images/main/fruit2.png", 55, 55, 10);
        this.game.load.image("desire", "images/main/wish.png");
   }
    create() {
        this.buttonStart = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, "buttons", this.startGame, this, 6, 7, 6);
        this.buttonStart.anchor.set(0.5, 0.2);


        this.inText = this.game.add.text(this.game.world.centerX, 30, "Don't give up. Try again.", {
            font: "50px Gloria+Hallelujah"
            , fill: "#2f5572"
            , align: "center" });
        this.inText.anchor.set(0.5,-1);

    }
    startGame() {
        this.game.state.start("Level1");
    }

    update() {
    }
}

export default GameOver;
