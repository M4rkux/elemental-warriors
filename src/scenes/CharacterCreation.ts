import Phaser from 'phaser';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants';
import { AnimationKeys } from '../consts/AnimationKeys';
import { SceneKeys } from '../consts/SceneKeys';
import { TextureKeys } from '../consts/TextureKeys';
import { TextButton } from '../objects/TextButton';

export default class CharacterCreation extends Phaser.Scene {

  private character!: Phaser.GameObjects.Sprite;
  private attributes = {
    int: 5,
    luk: 5,
    vit: 5,
    str: 5,
    agi: 5,
    dex: 5
  };
  private attributesTxt = ['Int', 'Luk', 'Vit', 'Str', 'Agi', 'Dex'];
  private polygonAttributes!: Phaser.GameObjects.Polygon;

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
      WORLD_WIDTH * 0.05,
      470 + 30,
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
    for (let i = 0; i < 6; i++) {
      basePositions.push(r * Math.sin(a * i), r * Math.cos(a * i));
      arr2.push((r / 2) * Math.sin(a * i), (r / 2) * Math.cos(a * i));
    }

    const basePolygon = this.add.polygon(originX, originY, basePositions, 0xFFFFFF, 1);
    const r2 = this.add.polygon(originX - (basePolygon.width / 4), originY - (basePolygon.height / 4), arr2, 0x6666ff, 0.25);
    // r2.setBlendMode(Phaser.BlendModes.SCREEN)

    const basePolygonBounds = basePolygon.getBounds();

    console.log(arr2);
    arr2[6] *= 1.85;
    arr2[7] *= 1.85;
    arr2[0] *= 0.15;
    arr2[1] *= 0.15;


    for (let i = 0; i < 6; i++) {
      const x = originX - (basePolygon.width / 2) + r * Math.sin(a * i);
      const y = originY - (basePolygon.height / 2) + r * Math.cos(a * i);
      const attr = new TextButton(
        this,
        x,
        y,
        this.attributesTxt[i],
        { fontFamily: 'Quicksand', fontSize: '1rem'},
        () => { this.changeAttributes(this.attributesTxt[i]); }
      );
      this.add.existing(attr);
      this.pushFromOrigin(x, y, attr, basePolygonBounds);
    }

    const graphics = this.add.graphics();
    graphics.setPosition(originX - (basePolygon.width / 2), originY - (basePolygon.height / 2));
    graphics.lineStyle(1, 0x6666ff, 0.5);
    graphics.lineBetween(basePositions[0], basePositions[1], basePositions[6], basePositions[7]);
    graphics.lineBetween(basePositions[2], basePositions[3], basePositions[8], basePositions[9]);
    graphics.lineBetween(basePositions[4], basePositions[5], basePositions[10], basePositions[11]);

    this.polygonAttributes = this.add.polygon(originX - (basePolygon.width / 4), originY - (basePolygon.height / 4), arr2, 0x6666ff, 1);

    // r1.setBlendMode(Phaser.BlendModes.SCREEN);
  }

  pushFromOrigin(x: number, y: number, obj: Phaser.GameObjects.Text,originBounds: Phaser.Geom.Rectangle) {
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

  changeAttributes(attr: string) {
    const attrLower = attr.toLowerCase();
    const idx = this.attributesTxt.indexOf(attr);
    const attrOpposite = (this.attributesTxt.find((txt, i) => {
      if (idx < 3) {
        return idx+3 === i && txt;
      } else {
        return idx-3 === i && txt;
      }
    }) || '').toLowerCase();
    if (this.attributes[attrOpposite] > 1) {
      this.attributes[attrLower]++;
      this.attributes[attrOpposite]--;
    }
    console.log(this.attributes);
    console.log(this.attributes);
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
