import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import config from './config';
import { GAME_TITLE } from './constants';
import CharacterCreation from './scenes/CharacterCreation';
import Demo from './scenes/Game';
import Menu from './scenes/Menu';

window.document.title = GAME_TITLE;

new Phaser.Game(
  Object.assign(config, {
    scene: [
      Menu,
      Demo,
      CharacterCreation
    ],
    plugins: {
      scene: [{
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
      }]
    }
  })
);
