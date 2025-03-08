export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Chama o construtor da classe pai (Phaser.Physics.Arcade.Sprite)
        super(scene, x, y, 'run');

        // Adiciona o jogador à cena
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configurações do jogador
        this.setCollideWorldBounds(true); // Impede que o jogador saia dos limites do mundo
        this.setScale(2); // Ajusta o tamanho do sprite
        this.body.setSize(25, 40); // Define o tamanho da hitbox
        this.body.setOffset(45, 40); // Ajusta a posição da hitbox

        this.createAnimations(scene); // Cria as animações do jogador
        this.isAttacking = false; // Controla o estado de ataque para evitar ações simultâneas
    }

    createAnimations(scene) {
        // Animação de ataque
        scene.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNumbers('attack', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0 // A animação acontece apenas uma vez
        });

        // Animação de pulo
        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('jump', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1 // A animação fica em loop enquanto o jogador estiver no ar
        });

        // Animação de correr para a direita
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1 // A animação se repete continuamente enquanto o jogador estiver correndo
        });

        // Animação de parada
        scene.anims.create({
            key: 'stop',
            frames: scene.anims.generateFrameNumbers('idle', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1 // A animação se mantém enquanto o jogador estiver parado
        });
    }

    move(cursors, background) {
        // Se o jogador estiver atacando, ele não pode se mover
        if (this.isAttacking) return;

        // Comando de ataque ao pressionar espaço
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.isAttacking = true; // Marca que o jogador está atacando
            this.setVelocityX(0); // Para o movimento durante o ataque
            this.anims.play('attack', true); // Executa a animação de ataque
            console.log("Ataque realizado!");

            // Após a animação terminar, permite que o jogador se mova novamente
            this.once('animationcomplete', () => {
                this.isAttacking = false;
            });
            return;
        }

        // Movimentação para a direita
        if (cursors.right.isDown) {
            this.setVelocityX(160); // Define a velocidade para a direita
            this.setFlipX(false); // Mantém o sprite voltado para a direita
            this.anims.play('right', true); // Ativa a animação de corrida

            // Movimento do background se houver um efeito de paralaxe
            if (background && background.moveParallaxR) {
                background.moveParallaxR();
            }
        }
        // Movimentação para a esquerda
        else if (cursors.left.isDown) {
            this.setVelocityX(-160); // Define a velocidade para a esquerda
            this.setFlipX(true); // Inverte o sprite para olhar para a esquerda
            this.anims.play('right', true); // Usa a mesma animação de corrida

            // Movimento do background se houver um efeito de paralaxe
            if (background && background.moveParallaxL) {
                background.moveParallaxL();
            }
        }
        // Se nenhuma tecla de movimento for pressionada, o jogador para
        else {
            this.setVelocityX(0); // Para o movimento
            this.anims.play('stop', true); // Ativa a animação de parado
        }

        // Comando de pulo
        if (cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-275); // Aplica uma força para cima
            this.anims.play('jump', true); // Ativa a animação de pulo
        }
    }
}
