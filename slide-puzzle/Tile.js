class Tile {
    constructor(imageUrl, imageX, imageY, width, height) {
        this.imageUrl = imageUrl;
        this.imageX = this.posX = imageX;
        this.imageY = this.posY = imageY;
        this.width = width;
        this.height = height;
        this.element = this.createElement();
    }

    createElement() {
        let element = document.createElement('div');

        element.style.backgroundImage = `url(${this.imageUrl})`;
        element.style.backgroundPosition = `-${this.imageX}px -${this.imageY}px`;
        element.style.width = `${this.width}px`;
        element.style.height = `${this.height}px`;
        element.style.position = 'absolute';
        element.style.left = `${this.posX}px`;
        element.style.top = `${this.posY}px`;
        element.style.border = '1px solid #181818';
        element.style.transition = '0.5s';

        return element;
    }

    updatePosition(x, y) {
        this.posX = x;
        this.posY = y;
        this.element.style.left = `${this.posX}px`;
        this.element.style.top = `${this.posY}px`;
    }
}
