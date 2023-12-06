const MIN_CONNECTION_DISTANCE = 250;
const MIN_CONNECTION_OPACITY = 0.2;
const ONE_ANGLE_IN_RADIANS = Math.PI / 180;
const PARTICLE_COLOR = 220;

class Particle {
    position;
    #radius;
    #velocity;

    constructor(position, radius, velocity) {
        this.position = position;
        this.#radius = radius;
        this.#velocity = velocity;
    }

    getDistance(x, y) {
        // Calculating distance using the pythagorean theorem
        return Math.sqrt(
            Math.pow(Math.abs(x - this.position.x), 2)
            + Math.pow(Math.abs(y - this.position.y), 2)
        );
    }

    update(canvas) {
        this.position.add(this.#velocity);

        if (this.position.x < 0) {
            this.position.x = -this.position.x;
            this.#velocity.x = -this.#velocity.x;
        } else if (this.position.x > canvas.width) {
            this.position.x = 2 * canvas.width - this.position.x;
            this.#velocity.x = -this.#velocity.x;
        }

        if (this.position.y < 0) {
            this.position.y = -this.position.y;
            this.#velocity.y = -this.#velocity.y;
        } else if (this.position.y > canvas.height) {
            this.position.y = 2 * canvas.height - this.position.y;
            this.#velocity.y = -this.#velocity.y;
        }

        return this;
    }

    draw(ctx) {
        ctx.fillStyle = `rgb(${PARTICLE_COLOR}, ${PARTICLE_COLOR}, ${PARTICLE_COLOR})`;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.#radius, 0, 360 * ONE_ANGLE_IN_RADIANS);
        ctx.fill();
        return this;
    }

    drawConnection(ctx, particle) {
        let distance = this.getDistance(particle.position.x, particle.position.y);

        if (distance < MIN_CONNECTION_DISTANCE) {
            let opacity = 1 - (Math.min(MIN_CONNECTION_DISTANCE, distance) / MIN_CONNECTION_DISTANCE) * (1 - MIN_CONNECTION_OPACITY);

            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(particle.position.x, particle.position.y);
            ctx.stroke();
        }

        return this;
    }
}