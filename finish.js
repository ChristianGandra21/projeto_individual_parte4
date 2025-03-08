class Finish extends Phaser.Scene {
    constructor() {
        super({ key: 'Finish' }); // Define a chave da cena como 'Finish'
    }

    preload() {
        // Carrega a imagem de fundo da cena de finalização
        this.load.image('scene', 'assets/finish/scene.png'); // Caminho do arquivo de imagem
    }

    create() {
        console.log('trocou de cena'); // Mensagem de depuração ao trocar para esta cena

        // Define a cor de fundo da cena (OBS: tem um erro na cor, deveria ser '0x241b19' e não '0#241b19')
        this.cameras.main.setBackgroundColor('0x241b19');

        // Adiciona a imagem de fundo na posição (400, 200) e ajusta o tamanho
        const cena = this.add.image(400, 200, 'scene').setScale(0.8);

        // Adiciona um texto de vitória centralizado na tela
        this.add.text(400, 400, 'Você derrotou o peixe maligno', { fontSize: '18px', fill: '#fff' }).setOrigin(0.5);

        // Adiciona um texto indicando o fim do jogo
        this.add.text(400, 460, 'FIM!', { fontSize: '30px', fill: '#fdf4ce' }).setOrigin(0.5);
    }
}

export default Finish;
