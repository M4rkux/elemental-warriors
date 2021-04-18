import Phaser from 'phaser';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants';
import { AnimationKeys } from '../consts/AnimationKeys';
import { SceneKeys } from '../consts/SceneKeys';
import { TextureKeys } from '../consts/TextureKeys';
import { TextButton } from '../objects/TextButton';
import WebFontFile from '../utils/WebFontFile';

export default class CharacterCreation extends Phaser.Scene {

  private character!: Phaser.GameObjects.Sprite;

  constructor() {
    super(SceneKeys.CharacterCreation);
  }

  create() {
    const title = this.add.text(WORLD_WIDTH / 2, 50, 'Character creation', { fontFamily: 'Yusei Magic', fontSize: '2.5rem' });
    title.setOrigin(0.5);

    const domLabelCharacterName = document.createElement('label');
    domLabelCharacterName.setAttribute('for', 'characterName');
    const label_name = this.add.dom(WORLD_WIDTH * 0.05, 470,
      domLabelCharacterName,
      `font-family: 'Quicksand'; font-size: 1.25rem; color: #FFFFFF;`,
      'Character name'
    );
    label_name.setOrigin(0);

    const domInputCharacterName = document.createElement('input');
    domInputCharacterName.setAttribute('id', 'characterName');
    const input_name = this.add.dom(
      WORLD_WIDTH * 0.05, 470 + 30,
      domInputCharacterName,
      'font-size: 1.25rem'
    );
    input_name.setOrigin(0);


    this.character = this.add.sprite(150, 300, TextureKeys.WarriorFrontIdle)
      .setOrigin(0.5);
    this.character.setScale(0.5);
    this.createAnimation();

    this.character.play(AnimationKeys.WarriorIdleFront);

    this.createArrtibutesChart(WORLD_WIDTH * 0.85, 450);

    const menu_quit = new TextButton(
      this,
      WORLD_WIDTH / 2,
      WORLD_HEIGHT * 0.85,
      'Back to menu',
      { fontFamily: 'Quicksand', fontSize: '2.5rem' },
      () => { this.scene.start(SceneKeys.Menu); });
    this.add.existing(menu_quit);
  }


  createArrtibutesChart(originX: number, originY: number) {
    const a = 2 * Math.PI / 6;
    const r = 130;

    const basePositions: number[] = [];
    const arr2: number[] = [];
    const attributes: string[] = ['Int', 'Luk', 'Vit', 'Str', 'Agi', 'Dex'];
    for (let i = 0; i < 6; i++) {
      basePositions.push(r * Math.sin(a * i), r * Math.cos(a * i));
      arr2.push((r / 2) * Math.sin(a * i), (r / 2) * Math.cos(a * i));
    }

    const basePolygon = this.add.polygon(originX, originY, basePositions, 0xFFFFFF, 1);
    const basePolygonBounds = basePolygon.getBounds();

    for (let i = 0; i < 6; i++) {
      const x = originX - (basePolygon.width / 2) + r * Math.sin(a * i);
      const y = originY - (basePolygon.height / 2) + r * Math.cos(a * i);
      const img = this.add.image(
        x,
        y,
        TextureKeys.GreenSliderDown,
      );
      img.setInteractive({ useHandCursor: true });
      this.pushFromOrigin(x, y, img, basePolygonBounds);
      this.fixAngle(img, i);
      const attr = this.add.text(
        x,
        y,
        attributes[i],
        { fontFamily: 'Quicksand', color: '#FFFFFF', fontSize: '1rem' }
      );
      this.pushFromOrigin(x, y, attr, basePolygonBounds);
    }

    const graphics = this.add.graphics();
    graphics.setPosition(originX - (basePolygon.width / 2), originY - (basePolygon.height / 2));
    graphics.lineStyle(1, 0x6666ff, 0.5);
    graphics.lineBetween(basePositions[0], basePositions[1], basePositions[6], basePositions[7]);
    graphics.lineBetween(basePositions[2], basePositions[3], basePositions[8], basePositions[9]);
    graphics.lineBetween(basePositions[4], basePositions[5], basePositions[10], basePositions[11]);

    const r2 = this.add.polygon(originX - (basePolygon.width / 4), originY - (basePolygon.height / 4), arr2, 0x6666ff, 1);

    // r1.setBlendMode(Phaser.BlendModes.SCREEN);
  }

  pushFromOrigin(
    x: number,
    y: number,
    obj: Phaser.GameObjects.Image | Phaser.GameObjects.Text,
    originBounds: Phaser.Geom.Rectangle,
  ) {
    if (x < originBounds.x) {
      x -= 15;
    } else if (x > originBounds.x) {
      x += 15;
    }

    if (y < originBounds.y) {
      y -= 15;
    } else if (y > originBounds.y) {
      y += 15;
    }
    obj.setOrigin(0.5);
    obj.setPosition(x, y);
  }

  fixAngle(img: Phaser.GameObjects.Image, i: number) {
    i = i < 2 ? i : i + 1;
    i = i < 6 ? i : i + 1;
    img.setAngle(-45*i);
  }

  createAnimation() {
    this.character.anims.create({
      key: AnimationKeys.WarriorIdleFront,
      frames: this.character.anims.generateFrameNames(TextureKeys.WarriorFrontIdle, {
        start: 0,
        end: 29,
        prefix: '0_Warrior_Idle_',
        zeroPad: 3,
        suffix: '.png'
      }),
      frameRate: 30,
      repeat: -1
    });
  }
}
