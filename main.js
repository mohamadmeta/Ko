const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const questions = [
    {
        id: 1,
        step: "بدنه سفینه",
        question: "اگر یک قطار از تهران به سمت مشهد حرکت کند و ساعت ۷ صبح حرکت کند، چه زمانی می‌رسد؟",
        options: ["۱۰ صبح", "۱۰ شب", "نامعلوم", "سؤال ناقص است"],
        answer: 3
    }
];

let player;
let cursors;
let stations;

new Phaser.Game(config);

function preload() {
    this.load.spritesheet(
        'astronaut',
        'astronaut.png',
        { frameWidth: 64, frameHeight: 64 }
    );
}

function create() {
    this.cameras.main.setBackgroundColor('#0A0A2A');

    player = this.physics.add.sprite(400, 300, 'astronaut');
    player.setCollideWorldBounds(true);
    player.setScale(1.5);

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('astronaut', { start: 1, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: [{ key: 'astronaut', frame: 0 }],
        frameRate: 20
    });

    cursors = this.input.keyboard.createCursorKeys();

    stations = this.physics.add.staticGroup();
    const s = this.add.circle(600, 200, 20, 0x00ff00, 0.6);
    this.physics.add.existing(s, true);
    stations.add(s);

    this.physics.add.overlap(player, stations, hitStation);
}

function update() {
    player.setVelocity(0);
    let moving = false;

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
        moving = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
        moving = true;
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
        moving = true;
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        moving = true;
    }

    player.anims.play(moving ? 'walk' : 'idle', true);
}

function hitStation(player, station) {
    alert(questions[0].question);
    station.destroy();
}
