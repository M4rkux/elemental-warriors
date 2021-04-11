import Phaser from 'phaser';
import { GAME_TITLE, WORLD_HEIGHT, WORLD_WIDTH } from '../constants';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const logo = this.add.image(WORLD_WIDTH/2, 70, 'logo');
    const title = this.add.text(WORLD_WIDTH/2, WORLD_HEIGHT*0.85, GAME_TITLE);
    title.setOrigin(0.5);

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}
