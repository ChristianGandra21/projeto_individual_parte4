class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' }); // Define a chave da cena como 'MainMenu'
    }

    preload() {
        // Carrega os recursos visuais usados no menu
        this.load.image('menuBoard', './assets/menu/board.png'); // Painel do menu
        this.load.image('logo', './assets/menu/logo.png'); // Logo do jogo
        this.load.image('instructions', './assets/menu/help_button.png'); // Botão de instruções
        this.load.image('playButton', './assets/menu/start_button.png'); // Botão de iniciar o jogo

        // Carrega o sprite sheet do fundo animado do menu
        this.load.spritesheet('backgroundMenu', './assets/menu/forest_bg.png', { 
            frameWidth: 624, 
            frameHeight: 384 
        });
    }

    create() {
        // Adiciona o fundo animado do menu
        const bgMenu = this.add.sprite(400, 300, 'backgroundMenu').setOrigin(0.5).setScale(1.75);

        // Criação da animação do fundo
        this.anims.create({
            key: 'bgAnim', // Nome da animação
            frames: this.anims.generateFrameNumbers('backgroundMenu', { start: 0, end: 3 }), // Quadros da animação
            frameRate: 20, // Velocidade da animação
            repeat: -1 // Animação em loop infinito
        });

        bgMenu.play('bgAnim'); // Inicia a animação do fundo

        // Adiciona o painel do menu
        this.add.image(400, 370, 'menuBoard').setScale(1);
        // Adiciona o logo do jogo
        this.add.image(400, 200, 'logo').setScale(0.6);

        // Adiciona o botão "Entrar no Jogo"
        const startButton = this.add.image(400, 360, 'playButton')
            .setInteractive({ cursor: 'pointer' }) // Torna o botão interativo
            .setScale(2.5);

        // Quando o botão for clicado, inicia a cena do jogo
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Efeito de brilho quando o mouse passa sobre o botão
        startButton.on('pointerover', () => {
            startButton.setTint(0xFFFFFF); // Altera a cor do botão
        });

        // Remove o brilho quando o mouse sai do botão
        startButton.on('pointerout', () => {
            startButton.clearTint();
        });

        // Texto explicativo sobre as instruções
        this.add.text(400, 470, '⬆⬆⬆ Aprenda como jogar acima ⬆⬆⬆', { fontSize: '18px', fill: '#FFFFFF' }).setOrigin(0.5);

        // Adiciona o botão "Instruções"
        const instructionsButton = this.add.image(400, 430, 'instructions')
            .setOrigin(0.5)
            .setScale(2.5)
            .setInteractive({ cursor: 'pointer' });

        // Quando o botão for clicado, troca para a cena de instruções
        instructionsButton.on('pointerdown', () => {
            this.scene.start('Instructions');
        });

        // Efeito de brilho quando o mouse passa sobre o botão
        instructionsButton.on('pointerover', () => {
            instructionsButton.setTint(0xFFFFFF);
        });

        // Remove o brilho quando o mouse sai do botão
        instructionsButton.on('pointerout', () => {
            instructionsButton.clearTint();
        });
    }
}

export default MainMenu;
