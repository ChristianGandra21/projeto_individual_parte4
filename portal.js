export default class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'portal'); // Corrigido para usar 'x' recebido como argumento

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(3.5);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        // Criar animação do portal (caso ainda não tenha sido criada)
        if (!scene.anims.get('portalAnim')) {
            scene.anims.create({
                key: 'portalAnim',
                frames: scene.anims.generateFrameNumbers('portal', { start: 0, end: 6 }), // Ajuste conforme seu spritesheet
                frameRate: 6,
                repeat: -1
            });
        }
        this.play('portalAnim'); // Toca a animação do portal
    }
}
