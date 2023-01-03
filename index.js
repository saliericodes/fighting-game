const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 512;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/Background.png',


})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})



const enemy = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'green',
    offset: {
        x: -50,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background.draw();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }

    //detect collision
    if (rectangularCollision({
        rectangular1: player,
        rectangular2: enemy
    }) &&
        player.isAttacking) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        console.log('hit');
    }
    if (rectangularCollision({
        rectangular1: enemy,
        rectangular2: player
    }) &&
        enemy.isAttacking) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
        console.log('enemy hit');
    }

    //end game
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }

}


animate();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            player.velocity.y = -20;
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'v':
            player.attack();
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'm':
            enemy.isAttacking = true;
            setTimeout(() => {
                enemy.isAttacking = false;
            }, 100);
            break;

    }
})

window.addEventListener('keyup', (e) => {

    switch (e.key) {

        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }

    //enemy keys
    switch (e.key) {

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
})