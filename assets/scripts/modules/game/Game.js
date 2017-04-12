import Level1 from "./Level1State";
import Level2 from "./Level2State";
import Level3 from "./Level3State";
import Title from "./TitleState";
import Over from './OverState';
import Stage1 from './Stage1State';
import Stage2 from './Stage2State';
import GameOver from './GameOverState';
import Winner from './WinnerState';

class Game extends Phaser.Game {
  	constructor() {
        super(800, 480, Phaser.AUTO, "ph_game");

        // Add  states to the game
    		this.state.add('Level1', Level1, false);
        this.state.add('Level2', Level2, false);
        this.state.add('Level3', Level3, false);
        this.state.add('Title', Title, false);
        this.state.add('Over', Over, false);
        this.state.add('Stage1', Stage1, false);
        this.state.add('Stage2', Stage2, false);
        this.state.add('GameOver', GameOver, false);
        this.state.add('Winner', Winner, false);
    		this.state.start('Title');
  	}
}

export default Game;
