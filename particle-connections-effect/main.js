const MIN_PARTICLE_RADIUS = 5;
const MAX_PARTICLE_RADIUS = 8;

const MIN_PARTICLE_VELOCITY = -3;
const MAX_PARTICLE_VELOCITY = 3;

const PARTICLE_COUNT_FACTOR = 0.001;

let interval;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function setup() {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    let particles = [];

    for (let i = 0; i < Math.sqrt(window.innerWidth * window.innerHeight * PARTICLE_COUNT_FACTOR); i++) {
        const position = new Vector2(random(0, canvas.width), random(0, canvas.height));
        const radius = random(MIN_PARTICLE_RADIUS, MAX_PARTICLE_RADIUS);
        const velocity = new Vector2(
            random(MIN_PARTICLE_VELOCITY, MAX_PARTICLE_VELOCITY),
            random(MIN_PARTICLE_VELOCITY, MAX_PARTICLE_VELOCITY)
        );

        particles.push(new Particle(position, radius, velocity));
    }

    interval = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#111111FF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update(canvas).draw(ctx)
            let count = 0;

            for (let j = i + 1; j < particles.length; j++) {
                particles[i].drawConnection(ctx, particles[j]);count++;
            }
            console.log(i + ": " + count);
        }
    }, 10);
}

function finish() {
    clearInterval(interval);
    document.querySelector('canvas').remove();
}

window.addEventListener('resize', function () {
    finish();
    setup();
});

setup();
