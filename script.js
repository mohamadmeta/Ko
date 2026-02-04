const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,   // ✅ فول‌اسکرین واقعی
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
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
    // بک‌گراند
    this.cameras.main.setBackgroundColor('#0A0A2A');

    // سازگاری با resize (موبایل / چرخش صفحه)
    this.scale.on('resize', (gameSize) => {
        const { width, height } = gameSize;
        this.cameras.resize(width, height);
    });

    // بازیکن
    player = this.physics.add.sprite(
        this.scale.width / 2,
        this.scale.height / 2,
        'astronaut'
    );
    player.setCollideWorldBounds(true);
    player.setScale(1.5);

    // انیمیشن‌ها
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

    // کنترل کیبورد
    cursors = this.input.keyboard.createCursorKeys();

    // ایستگاه سؤال
    stations = this.physics.add.staticGroup();
    const station = this.add.circle(
        this.scale.width * 0.75,
        this.scale.height * 0.35,
        20,
        0x00ff00,
        0.7
    );
    this.physics.add.existing(station, true);
    stations.add(station);

    this.physics.add.overlap(player, stations, hitStation);
}

function update() {
    player.setVelocity(0);
    let moving = false;

    if (cursors.left.isDown) {
        player.setVelocityX(-180);
        player.setFlipX(true);
        moving = true;
    } 
    else if (cursors.right.isDown) {
        player.setVelocityX(180);
        player.setFlipX(false);
        moving = true;
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-180);
        moving = true;
    } 
    else if (cursors.down.isDown) {
        player.setVelocityY(180);
        moving = true;
    }

    player.anims.play(moving ? 'walk' : 'idle', true);
}

function hitStation(player, station) {
    alert(questions[0].question);
    station.destroy();
}
