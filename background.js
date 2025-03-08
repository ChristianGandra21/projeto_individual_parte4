export default class Background {
    constructor(scene) {
        // Define a largura e altura da cena
        const largura = scene.scale.width;
        const altura = scene.scale.height;

        this.scene = scene; // Armazena a cena na instância da classe

        // Adiciona os diferentes elementos do fundo como tileSprites e ajusta suas origens e escalas
        this.background = scene.add.tileSprite(0, 0, largura, altura, 'sky').setOrigin(0, 0);
        this.farTree = scene.add.tileSprite(0, -30, largura * 3, altura, 'farTree').setOrigin(0, 0).setScale(2.5);
        this.midTree = scene.add.tileSprite(0, -30, largura * 3, altura, 'midTree').setOrigin(0, 0).setScale(2.5);
        this.closeTree = scene.add.tileSprite(0, -30, largura * 3, altura, 'closeTree').setOrigin(0, 0).setScale(2.5);

        this.parallaxEnabled = true; // Habilita o efeito de paralaxe
    }

    moveParallaxR() {
        // Verifica se o efeito de paralaxe está habilitado e se a cena atual é 'GameScene'
        if (this.parallaxEnabled && this.scene.scene.key === 'GameScene') {
            // Move os elementos do fundo para a direita, criando o efeito de paralaxe
            this.background.tilePositionX += 0.5;
            this.farTree.tilePositionX += 0.2;
            this.midTree.tilePositionX += 0.6;
            this.closeTree.tilePositionX += 1.1;
        }
    }

    moveParallaxL() {
        // Verifica se o efeito de paralaxe está habilitado e se a cena atual é 'GameScene'
        if (this.parallaxEnabled && this.scene.scene.key === 'GameScene') {
            // Move os elementos do fundo para a esquerda, criando o efeito de paralaxe
            this.background.tilePositionX -= 0.5;
            this.farTree.tilePositionX -= 0.2;
            this.midTree.tilePositionX -= 0.6;
            this.closeTree.tilePositionX -= 1.1;
        }
    }

    stopParallax() {
        // Desabilita o efeito de paralaxe
        this.parallaxEnabled = false;
        // Aplica um tom cinza aos elementos do fundo
        this.background.setTint(0x898989);
        this.farTree.setTint(0x898989);
        this.midTree.setTint(0x898989);
        this.closeTree.setTint(0x898989);
    }
}
