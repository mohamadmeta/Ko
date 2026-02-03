const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#0b1d2a',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: { preload, create, update }
};

let player, cursors;
new Phaser.Game(config);

function preload() {
    this.load.spritesheet('astro', 'assets/astronaut.png', {
        frameWidth: 128,
        frameHeight: 128
    });
}

function create() {
    player = this.physics.add.sprite(400, 300, 'astro', 0);
    player.setScale(0.6);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.setVelocity(0);
    if (cursors.left.isDown) player.setVelocityX(-200);
    else if (cursors.right.isDown) player.setVelocityX(200);
    if (cursors.up.isDown) player.setVelocityY(-200);
    else if (cursors.down.isDown) player.setVelocityY(200);
}
