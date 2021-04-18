import { SceneKeys } from "../consts/SceneKeys";
import { TextureKeys } from "../consts/TextureKeys";
import WebFontFile from "../utils/WebFontFile";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload(): void {
    const fonts = new WebFontFile(this.load, 'Quicksand');
    this.load.addFile(fonts);

    this.load.atlas(TextureKeys.WarriorFrontIdle,
      'characters/warrior_front_idle.png',
      'characters/warrior_front_idle.json'
    );

    this.load.image(TextureKeys.GreenSliderUp, 'assets/green_sliderUp.png');
    this.load.image(TextureKeys.GreenSliderDown, 'assets/green_sliderDown.png');
  }

  create() {
    this.scene.start(SceneKeys.Menu);
  }
}