class Grid {
    constructor(imageUrl, tilesInOneRow, onReady) {
        this.image = new Image();
        this.image.src = imageUrl;
        this.image.onload = () => {
            this.tilesInARow = tilesInOneRow;
            this.tilesInAColumn = Math.round(
                this.image.height / (this.image.width / this.tilesInARow)
            );
            this.tileWidth = this.image.width / this.tilesInARow;
            this.tileHeight = this.image.height / this.tilesInAColumn;
            this.blankTile = { element: '', updatePosition: () => {} };
            this.blankTilePos = {
                x: this.tilesInARow - 1,
                y: this.tilesInAColumn - 1,
            };
            this.grid = this.generateGrid();
            this.element = this.createElement();
            this.shuffleTiles();

            onReady();
        };
    }

    generateGrid() {
        let grid = [];

        for (let i = 0; i < this.tilesInARow; i++) {
            grid[i] = [];

            for (let j = 0; j < this.tilesInAColumn; j++) {
                if (i === this.tilesInARow - 1 && j === this.tilesInAColumn - 1)
                    grid[i][j] = this.blankTile;
                else
                    grid[i][j] = new Tile(
                        this.image.src,
                        this.tileWidth * i,
                        this.tileHeight * j,
                        this.tileWidth,
                        this.tileHeight
                    );
            }
        }

        return grid;
    }

    createElement() {
        let element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.height = `${this.image.height}px`;
        element.style.width = `${this.image.width}px`;

        for (let row in this.grid) {
            for (let column in this.grid[row]) {
                element.append(this.grid[row][column].element);
            }
        }

        return element;
    }

    moveOnBlank(toDirection) {
        let x = this.blankTilePos.x;
        let y = this.blankTilePos.y;

        switch (toDirection) {
            case 'top':
                if (y !== this.tilesInAColumn - 1) {
                    this.grid[x][y] = this.grid[x][y + 1];
                    this.grid[x][y + 1] = this.blankTile;
                    this.blankTilePos.y += 1;
                }
                break;
            case 'bottom':
                if (y !== 0) {
                    this.grid[x][y] = this.grid[x][y - 1];
                    this.grid[x][y - 1] = this.blankTile;
                    this.blankTilePos.y -= 1;
                }
                break;
            case 'left':
                if (x !== this.tilesInARow - 1) {
                    this.grid[x][y] = this.grid[x + 1][y];
                    this.grid[x + 1][y] = this.blankTile;
                    this.blankTilePos.x += 1;
                }
                break;
            case 'right':
                if (x !== 0) {
                    this.grid[x][y] = this.grid[x - 1][y];
                    this.grid[x - 1][y] = this.blankTile;
                    this.blankTilePos.x -= 1;
                }
                break;
        }

        this.grid[x][y].updatePosition(this.tileWidth * x, this.tileHeight * y);
    }

    shuffleTiles() {
        const directions = ['top', 'bottom', 'left', 'right'];

        for (let i = 0; i < (this.tilesInARow + this.tilesInAColumn) ** 2.2; i++) {
            this.moveOnBlank(directions[Math.floor(Math.random() * 4)]);
            console.log(i)
        }
    }
}
