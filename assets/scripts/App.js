import RevealOnScroll from './modules/landingPage/RevealOnScroll';
import StickyHeader from './modules/landingPage/StickyHeader';
import Modal from './modules/landingPage/Modal';
import $ from "jquery";
import Game from "./modules/game/Game";


new Game();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".team"), "60%");
new StickyHeader();
new Modal();
