import Phaser from 'phaser';
import { GAME_TITLE, WORLD_HEIGHT, WORLD_WIDTH } from '../constants';

export default class CharacterCreation extends Phaser.Scene {
  constructor() {
    super('CharacterCreation');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('bg-text', 'assets/PNG/grey_button06.png');
  }

  create() {
    this.add.dom(0, 0, 'input', 'width: 100px, height: 30px', 'Sample text');
    const background = this.add.image(400, 300, 'bg-text');
    const label_name = this.add.text(WORLD_WIDTH/2, WORLD_HEIGHT*0.2, 'Character name');
    label_name.setOrigin(0.5);
    var textBox = this.rexUI.add.textBox({
        orientation: 0,
        background: background,
        // icon: iconGameObject,
        iconMask: false,
        text: label_name,
        // action: actionGameObject,
        actionMask: false,
        space: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
    
            icon: 0,
            text: 0,
        },
    });
    textBox.setOrigin(0.5);
    this.add.existing(textBox);
    const input_name = this.add.dom(WORLD_WIDTH/2, WORLD_HEIGHT*0.3, document.createElement('input'));
    input_name.setOrigin(0.5);
    const title = this.add.text(WORLD_WIDTH/2, WORLD_HEIGHT*0.85, GAME_TITLE);
    title.setOrigin(0.5);
  }
}
