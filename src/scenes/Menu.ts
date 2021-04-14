import Phaser from 'phaser';
import { GAME_TITLE, WORLD_HEIGHT, WORLD_WIDTH } from '../constants';
import { TextButton } from '../objects/TextButton';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const title = this.add.text(WORLD_WIDTH/2, WORLD_HEIGHT*0.1, GAME_TITLE, { fontFamily: 'Cyrodiil-xJ48', fontSize: '4rem'});
    title.setOrigin(0.5);
    const menu_new_game = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.3, 'New Game', { fontFamily: 'Cyrodiil-xJ48', fontSize: '2.5rem'}, () => { this.scene.start('CharacterCreation'); });
    this.add.existing(menu_new_game);
    const menu_continue = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.4, 'Continue', { fontFamily: 'Cyrodiil-xJ48', fontSize: '2.5rem'}, () => { this.scene.start('GameScene'); }, true);
    this.add.existing(menu_continue);
    const menu_config = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.5, 'Configuration', { fontFamily: 'Cyrodiil-xJ48', fontSize: '2.5rem'});
    this.add.existing(menu_config);
    const menu_quit = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.6, 'Quit', { fontFamily: 'Cyrodiil-xJ48', fontSize: '2.5rem'});
    this.add.existing(menu_quit);
  }
}
