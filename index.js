const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 512;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, 50, 150);
    }

    update() {
        this.draw();
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
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
    }
})


function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

}

animate();