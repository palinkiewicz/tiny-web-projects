const GRID_CONTAINER_QUERY = 'main';
const CELL_SIZE = 50;
const WAVE_DELAY = 40;
const CLICK_SCALE = 1.2;
const CLICK_DELAY = 100;

class Grid {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.table = [];

        this.fillTable(this.generateColor());
        this.displayTable();
    }

    fillTable(color) {
        for (let i = 0; i < this.width; i++) {
            this.table.push([]);

            for (let j = 0; j < this.height; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
                cell.addEventListener('click', () => {
                    this.changeColor(this.generateColor(), i, j);

                    // On click cell animation
                    this.table[i][j].style.zIndex = 2;
                    this.table[i][j].style.scale = CLICK_SCALE;

                    setTimeout(() => {
                        this.table[i][j].style.scale = 1;

                        setTimeout(() => {
                            this.table[i][j].style.zIndex = 0;
                        }, CLICK_DELAY)
                    }, CLICK_DELAY)
                });

                this.table[i].push(cell);
            }
        }
    }

    displayTable() {
        for (let i = 0; i < this.width; i++) {
            let container = document.createElement('div');
            container.classList.add('cell-row');

            for (let j = 0; j < this.height; j++) {
                container.append(this.table[i][j]);
            }

            document.querySelector(GRID_CONTAINER_QUERY).append(container);
        }
    }

    generateColor() {
        return {
            red: Math.round(Math.random() * 255),
            green: Math.round(Math.random() * 255),
            blue: Math.round(Math.random() * 255),
        };
    }

    changeColor(color, x, y, from) {
        if (x >= 0 && x <= this.width - 1 && y >= 0 && y <= this.height - 1) {
            this.table[x][y].style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;

            setTimeout(() => {
                switch (from) {
                    case 'top':
                        this.changeColor(color, x, y - 1, 'top');
                        this.changeColor(color, x - 1, y, 'left');
                        this.changeColor(color, x + 1, y, 'right');
                        break;
                    case 'left':
                        this.changeColor(color, x - 1, y, 'left');
                        break;
                    case 'bottom':
                        this.changeColor(color, x, y + 1, 'bottom');
                        this.changeColor(color, x - 1, y, 'left');
                        this.changeColor(color, x + 1, y, 'right');
                        break;
                    case 'right':
                        this.changeColor(color, x + 1, y, 'right');
                        break;
                    default:
                        this.changeColor(color, x, y - 1, 'top');
                        this.changeColor(color, x - 1, y, 'left');
                        this.changeColor(color, x, y + 1, 'bottom');
                        this.changeColor(color, x + 1, y, 'right');
                }
            }, WAVE_DELAY);
        }
    }
}

const newGrid = () => new Grid(Math.floor(window.innerWidth / CELL_SIZE), Math.floor(window.innerHeight / CELL_SIZE));
let grid = newGrid();

window.addEventListener('resize', function () {
    document.querySelectorAll('.cell-row').forEach(row => row.remove());
    grid = newGrid();
});
