import Player from './player.js'; // Importa a classe Player de um módulo relativo
import Enemy from './enemy.js'; // Importa a classe Enemy de um módulo relativo

class BattleScene extends Phaser.Scene {
    constructor() {
        super('BattleScene'); // Chama o construtor da classe Phaser.Scene e define o nome da cena como 'BattleScene'
        this.isInvincible = false; // Define a propriedade 'isInvincible' como falsa
    }

    init(data) {
        // Inicializa as coordenadas do jogador com os dados fornecidos ou com valores padrão
        this.playerX = data.x !== undefined ? data.x : 400;
        this.playerY = data.y !== undefined ? data.y : 300;
    }

    preload() {
        // Carrega os recursos necessários para a cena, como spritesheets e imagens
        this.load.spritesheet('battleBackground', 'assets/bg/battle_bg.png', { frameWidth: 624, frameHeight: 384 });
        this.load.image('platform', 'assets/plataforma.png');
        this.load.image('ground', 'assets/bg/ground.png');
        this.load.spritesheet('fish', 'assets/enemy/fish.png', { frameWidth: 96, frameHeight: 80 });
        this.load.spritesheet('fishDie', 'assets/enemy/fishDie.png', { frameWidth: 96, frameHeight: 80 });
    }

    create() {
        let plataformGround; // Declaração da variável plataformGround, que não está sendo utilizada no momento

        // Adiciona o sprite de fundo da batalha e configura suas propriedades
        const battleBackgroundSprite = this.add.sprite(400, 300, 'battleBackground').setOrigin(0.5).setScale(1.5);
        // Cria a animação 'battleBackground' com os quadros especificados
        this.anims.create({
            key: 'battleBackground',
            frames: this.anims.generateFrameNumbers('battleBackground', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: -1
        });
        battleBackgroundSprite.play('battleBackground'); // Reproduz a animação 'battleBackground'
        battleBackgroundSprite.setAlpha(0.5); // Define a opacidade do sprite de fundo da batalha

        // Cria um grupo de plataformas estáticas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 525, 'platform');
        this.platforms.create(100, 400, 'platform');
        this.platforms.create(700, 400, 'platform');

        // Cria uma instância do jogador e define sua posição inicial
        this.player = new Player(this, this.playerX, this.playerY);
        this.player.setPosition(200, 400);

        // Cria uma instância do inimigo e define o jogador como seu alvo
        this.enemy = new Enemy(this, 600, 400);
        this.enemy.setPlayer(this.player);

        // Cria um objeto de chão estático, ajusta sua escala e atualiza o corpo de colisão
        this.ground = this.physics.add.staticImage(400, 580, 'ground').setScale(1, 0.5).refreshBody();
        this.physics.add.collider(this.player, this.ground); // Adiciona colisão entre o jogador e o chão
        this.physics.add.collider(this.enemy, this.ground); // Adiciona colisão entre o inimigo e o chão

        // Adiciona colisão entre o jogador e as plataformas
        this.physics.add.collider(this.player, this.platforms);
        
        // Adiciona colisão entre o inimigo e as plataformas, chamando 'handlePlatformCollision' ao colidir
        this.physics.add.collider(this.enemy, this.platforms, (enemy, platform) => {
            enemy.handlePlatformCollision();
        });
        
        // Adiciona colisão entre o inimigo e o jogador
        this.physics.add.collider(this.enemy, this.player);

        // Cria as teclas de cursor para controlar o jogador
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Atualiza o movimento do jogador e do inimigo
        this.player.move(this.cursors);
        this.enemy.update();

        // Verifica se o inimigo está visível, se a tecla de espaço está pressionada e se o jogador colidiu com o inimigo
        if (this.enemy.visible && this.cursors.space.isDown && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy.getBounds())) {
            this.enemy.receiveHit(); // Chama a função 'receiveHit' do inimigo
        }
    }
}

export default BattleScene; // Exporta a classe BattleScene como padrão
