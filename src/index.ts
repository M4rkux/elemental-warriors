import Phaser from 'phaser';
import config from './config';
import { GAME_TITLE } from './constants';
import GameScene from './scenes/Game';

window.document.title = GAME_TITLE;

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);
