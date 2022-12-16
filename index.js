const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 512;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
class Sprite {
    constructor({ position, velocity, color = 'red' }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking

    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        //attack box
        ctx.fillStyle = 'blue';
        ctx.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        );
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 1000);
    }

}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})



const enemy = new Sprite({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'green'
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

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    if
        (player.position.x + player.attackBox.width >= enemy.position.x &&
        player.position.x <= enemy.position.x + enemy.width &&
        player.position.y + player.attackBox.height >= enemy.position.y &&
        player.position.y <= enemy.position.y + enemy.height &&
        player.isAttacking) {
        player.isAttacking = false;
        console.log('hit');
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