export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle, callback: Function = () => {}, disabled: boolean = false) {
      super(scene, x, y, text, style);

      this.setOrigin(0.5);
      this.setStyle({ fill: '#0f0'});
  
      this.setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() )
        .on('pointerup', () => {
          this.enterButtonHoverState();
          callback();
        });

        if (disabled) {
            this.disableInteractive();
            this.setStyle({ fill: '#666' });
        }
    }
  
    enterButtonHoverState() {
      this.setStyle({ fill: '#ff0'});
    }
  
    enterButtonRestState() {
      this.setStyle({ fill: '#0f0'});
    }
  
    enterButtonActiveState() {
      this.setStyle({ fill: '#0ff' });
    }
  }