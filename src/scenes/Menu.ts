import Phaser from 'phaser';
import { GAME_TITLE, WORLD_HEIGHT, WORLD_WIDTH } from '../constants';
import { SceneKeys } from '../consts/SceneKeys';
import { TextButton } from '../objects/TextButton';
import WebFontFile from '../utils/WebFontFile';

export default class Menu extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Menu);
  }

  preload() {
    const fonts = new WebFontFile(this.load, ['Quicksand', 'Yusei Magic']);
		this.load.addFile(fonts);
  }

  create() {
    const title = this.add.text(WORLD_WIDTH/2, WORLD_HEIGHT*0.1, GAME_TITLE, { fontFamily: 'Yusei Magic', fontSize: '4rem'});
    title.setOrigin(0.5);
    const menu_new_game = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.3, 'New Game', { fontFamily: 'Quicksand', fontSize: '2.5rem'}, () => { this.scene.start(SceneKeys.CharacterCreation); });
    this.add.existing(menu_new_game);
    const menu_continue = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.4, 'Continue', { fontFamily: 'Quicksand', fontSize: '2.5rem'}, () => { this.scene.start(SceneKeys.Game); }, true);
    this.add.existing(menu_continue);
    const menu_config = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.5, 'Configuration', { fontFamily: 'Quicksand', fontSize: '2.5rem'});
    this.add.existing(menu_config);
    const menu_quit = new TextButton(this, WORLD_WIDTH/2, WORLD_HEIGHT*0.6, 'Quit', { fontFamily: 'Quicksand', fontSize: '2.5rem'});
    this.add.existing(menu_quit);
  }
}
