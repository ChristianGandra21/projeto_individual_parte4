export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'fish'); // Chama o construtor da classe base Phaser.Physics.Arcade.Sprite

        scene.add.existing(this); // Adiciona o inimigo à cena
        scene.physics.add.existing(this); // Adiciona o corpo de física ao inimigo

        this.setScale(2); // Define a escala do inimigo
        this.setCollideWorldBounds(true); // Faz com que o inimigo colida com os limites do mundo
        this.body.setSize(30, 45); // Ajusta o tamanho do corpo de colisão
        this.body.setOffset(40, 20); // Ajusta o deslocamento do corpo de colisão

        this.speed = 90; // Velocidade de movimento do inimigo
        this.jumpSpeed = -250; // Velocidade de pulo do inimigo
        this.detectionRange = 300; // Alcance de detecção do jogador
        this.isAttacking = false; // Estado de ataque do inimigo
        this.health = 30; // Saúde do inimigo
        this.player = null; // Referência para o jogador
        this.isJumping = false; // Estado de pulo do inimigo

        // Cria a animação 'fishIdle' se não existir
        if (!scene.anims.exists('fishIdle')) {
            scene.anims.create({
                key: 'fishIdle',
                frames: scene.anims.generateFrameNumbers('fish', { start: 0, end: 13 }),
                frameRate: 6,
                repeat: -1
            });
        }

        // Cria a animação 'fishDie' se não existir
        if (!scene.anims.exists('fishDie')) {
            scene.anims.create({
                key: 'fishDie',
                frames: scene.anims.generateFrameNumbers('fishDie', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
        }
    }

    setPlayer(player) {
        this.player = player; // Define a referência para o jogador
    }

    update() {
        if (!this.player || this.health <= 0) return; // Se o jogador não existir ou a saúde for menor ou igual a 0, retorna

        // Calcula a distância entre o inimigo e o jogador
        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if (distance < this.detectionRange) {
            this.followPlayer(); // Se a distância for menor que o alcance de detecção, segue o jogador
        } 
        else {
            this.setVelocityX(0); // Para o movimento horizontal
            this.anims.play('fishIdle', true); // Reproduz a animação 'fishIdle'
        }
    }

    followPlayer() {
        if (this.player.x < this.x) {
            this.setVelocityX(-this.speed); // Move para a esquerda
            this.setFlipX(true); // Espelha a imagem horizontalmente
        } 
        else {
            this.setVelocityX(this.speed); // Move para a direita
            this.setFlipX(false); // Não espelha a imagem
        }
    }

    receiveHit() {
        this.health -= 1; // Reduz a saúde em 1
        if (this.health <= 0) {
            this.die(); // Se a saúde for menor ou igual a 0, executa a função 'die'
        }
    }

    die() {
        this.anims.play('fishDie', true); // Reproduz a animação 'fishDie'
        this.once('animationcomplete', () => {
            // Adiciona um atraso de 1000 milissegundos (1 segundo) antes de trocar a cena
            this.scene.time.delayedCall(1000, () => {
                this.scene.scene.start('Finish'); // Troca para a cena 'Finish'
            }, [], this);
        });
    }

    handlePlatformCollision() {
        if (!this.isJumping) {
            this.isJumping = true; // Define o estado de pulo como verdadeiro
            this.setVelocityY(this.jumpSpeed); // Define a velocidade de pulo
            
            // Adiciona um atraso de 500 milissegundos (0,5 segundos) para redefinir o estado de pulo
            this.scene.time.delayedCall(500, () => {
                this.isJumping = false; // Redefine o estado de pulo para falso
            });
        }
    }
}
