class Instructions extends Phaser.Scene {
    constructor() {
        super({ key: 'Instructions' });
    }

    preload() {
        // Carrega as imagens das teclas
        this.load.spritesheet('space', './assets/menu/backspace.png', { frameWidth: 65, frameHeight: 32 });
        this.load.spritesheet('up', './assets/menu/seta_cima.png', { frameWidth: 33, frameHeight: 32 });
        this.load.spritesheet('right', './assets/menu/seta_direita.png', { frameWidth: 33, frameHeight: 32 });
        this.load.spritesheet('left', './assets/menu/seta_esquerda.png', { frameWidth: 33, frameHeight: 32 });

        this.load.image('back', './assets/menu/back_button.png');
    }

    create() {
        // Adiciona o título
        this.add.text(400, 90, 'Instruções', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Adiciona o texto de instrução do movimento
        this.add.text(400, 150, 'Use as setas do teclado para mover o jogador:', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        // Função auxiliar para adicionar animações das teclas
        const createKeyAnimation = (key, x, y, text) => {
            const sprite = this.add.sprite(x, y, key).setOrigin(0.5);
            this.anims.create({
                key: `${key}Anim`,
                frames: this.anims.generateFrameNumbers(key, { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });
            sprite.play(`${key}Anim`);
            this.add.text(x + 140, y - 2, text, { fontSize: '18px', fill: '#fff' }).setOrigin(0.5);
        };

        // Criação das animações das teclas
        createKeyAnimation('left', 370, 200, 'Mover para a esquerda');
        createKeyAnimation('right', 370, 250, 'Mover para a direita');
        createKeyAnimation('up', 370, 300, 'Pular');
        createKeyAnimation('space', 370, 350, 'Atacar');

        // Instruções sobre o objetivo do jogo
        const instructionsText = [
            'Seu objetivo inicial é coletar as varas de pesca mágicas, com pontuação positiva aleatória, até atingir 2000 pontos.',
            'Você deve evitar os peixes maldosos que caem do céu para te tirar ponto.',
            'Após isso você deve derrotar o grande peixe maligno da floresta dos peixes.'
        ];

        instructionsText.forEach((text, index) => {
            this.add.text(400, 420 + (index * 50), text, { 
                fontSize: '18px', 
                fill: '#b489ac',
                align: 'center',
                wordWrap: { width: 500, useAdvancedWrap: true }
            }).setOrigin(0.5);
        });

        // Botão de voltar ao menu
        const backButton = this.add.image(400, 560, 'back').setOrigin(0.5).setInteractive({ cursor: 'pointer' }).setScale(2.75);
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        backButton.on('pointerover', () => {
            backButton.setTint(0xFFFFFF);
        });
        backButton.on('pointerout', () => {
            backButton.clearTint();
        });
    }
}

export default Instructions;
