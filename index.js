const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 512;

ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, 50, 150);
    }

    update() {
        this.draw();
        this.position.y += 10;
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
    player.update();
    enemy.update();

}

animate();