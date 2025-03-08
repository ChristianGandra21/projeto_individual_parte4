export default class BadItem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'badItem'); // Usa a textura 'item'

        scene.add.existing(this).setScale(0.5);;
        scene.physics.world.enable(this);

        this.body.setAllowGravity(false); // Sem gravidade
        this.setCollideWorldBounds(false);
    }

    update() {
        if (this.x < -50) {
            this.destroy(); // Remove quando sai da tela
        }
    }
}
