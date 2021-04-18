import Phaser from 'phaser';
import { WORLD_HEIGHT, WORLD_WIDTH } from './constants';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000F0F',
  dom: {
    createContainer: true,
  },
  scale: {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
};
