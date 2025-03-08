import Player from './player.js';
import Background from './background.js';
import Item from './item.js';
import BadItem from './badItem.js';
import Portal from './portal.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0; // Variável para armazenar a pontuação do jogador
        this.portalCreated = false; // Flag para garantir que o portal seja criado apenas uma vez
    }

    preload() {
        // Carregamento de imagens de fundo
        this.load.image('sky', 'assets/bg/sky.png');
        this.load.image('closeTree', 'assets/bg/close_tree.png');
        this.load.image('midTree', 'assets/bg/mid_tree.png');
        this.load.image('farTree', 'assets/bg/far_tree.png');
        this.load.image('ground', 'assets/bg/ground.png');

        // Carregamento de sprites do jogador
        this.load.spritesheet('attack', 'assets/player/sword.png', { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('run', 'assets/player/run.png', { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('idle', 'assets/player/idle.png', { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('jump', 'assets/player/jump.png', { frameWidth: 120, frameHeight: 80 });

        // Carregamento de itens e do portal
        this.load.image('item', 'assets/item.png'); // Item positivo
        this.load.image('badItem', 'assets/badItem.png'); // Item negativo
        this.load.spritesheet('portal', 'assets/portal.png', { frameWidth: 32, frameHeight: 32 }); // Spritesheet do portal
    }

    create() {
        const largura = this.scale.width;
        const altura = this.scale.height;

        // Criando o fundo dinâmico
        this.background = new Background(this);

        // Criando o jogador na posição inicial
        this.player = new Player(this, 100, 300);

        // Criando o chão e garantindo que ele seja um objeto físico estático
        this.ground = this.physics.add.staticImage(400, 580, 'ground').setScale(1, 0.5).refreshBody();
        this.physics.add.collider(this.player, this.ground);

        // Captura das teclas de movimentação
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Configuração da câmera para seguir o jogador
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, largura, altura);

        // Grupos para os itens do jogo
        this.items = this.physics.add.group();
        this.badItems = this.physics.add.group();
        this.portal = null;

        // Exibição da pontuação na tela
        this.scoreText = this.add.text(20, 20, 'Pontos: 0', { fontSize: '24px', fill: '#fff' }).setScrollFactor(0);

        // Configuração de colisões entre o jogador e os itens
        this.physics.add.overlap(this.player, this.items, this.collectItem, null, this);
        this.physics.add.overlap(this.player, this.badItems, this.collectBadItem, null, this);

        // Inicia a geração automática de itens
        this.spawnItems();
    }

    update() {
        // Atualiza a movimentação do jogador
        this.player.move(this.cursors, this.background);

        // Atualiza os itens em cena
        this.items.children.iterate((item) => {
            if (item) item.update();
        });

        this.badItems.children.iterate((badItem) => {
            if (badItem) badItem.update();
        });

        // Quando a pontuação atinge 2000, o portal aparece
        if (this.score >= 2000 && !this.portalCreated) {
            this.createPortal();
        }
    }

    spawnItems() {
        if (this.portalCreated) {
            return; // Impede que novos itens sejam gerados após o portal ser criado
        }

        // Tipos de itens disponíveis
        const itemTypes = ['good', 'bad'];

        // Criação de múltiplos itens ao mesmo tempo
        for (let i = 0; i < 5; i++) { // Cria 5 itens por vez
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 400);
            
            // Escolhe aleatoriamente entre um item positivo ou negativo
            const itemType = Phaser.Math.RND.pick(itemTypes);

            if (itemType === 'good') {
                const item = new Item(this, x, y);
                this.items.add(item);
            } else {
                const badItem = new BadItem(this, x, y);
                this.badItems.add(badItem);
            }
        }

        // Configura um tempo para chamar `spawnItems()` novamente e manter a geração contínua
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 1500), // Tempo aleatório entre 1s e 1,5s para novos itens aparecerem
            callback: () => this.spawnItems(),
            loop: false
        });
    }

    collectItem(player, item) {
        item.destroy(); // Remove o item da cena após a coleta

        // Possíveis pontuações para cada item coletado
        const scores = [50, 100, 150, 200, 250];

        // Seleciona uma pontuação aleatória
        const randomScore = Phaser.Math.RND.pick(scores);

        this.score += randomScore;
        this.scoreText.setText(`Pontos: ${this.score}`); // Atualiza o placar
    }

    collectBadItem(player, badItem) {
        badItem.destroy(); // Remove o item negativo da cena
        this.score -= 150; // Reduz a pontuação ao coletar um item ruim
        this.scoreText.setText(`Pontos: ${this.score}`); // Atualiza o placar
    }

    createPortal() {
        this.portalCreated = true; // Marca que o portal já foi criado
        this.portal = new Portal(this, 700, 400); // Cria o portal em uma posição fixa
        this.physics.add.overlap(this.player, this.portal, this.enterPortal, null, this);
        this.background.stopParallax(); // Para o movimento do fundo ao abrir o portal
    }

    enterPortal() {
        this.scene.start('BattleScene', { x: this.player.x, y: this.player.y }); // Transição para a fase de batalha
    }
}

export default GameScene;
