import Phaser from 'phaser';
import config from './config';
import { GAME_TITLE } from './constants';
import CharacterCreation from './scenes/CharacterCreation';
import Menu from './scenes/Menu';
import Preloader from './scenes/Preloader';

window.document.title = GAME_TITLE;

new Phaser.Game(
  Object.assign(config, {
    scene: [
      Preloader,
      Menu,
      CharacterCreation
    ],
  })
);
