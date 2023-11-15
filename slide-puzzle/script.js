document.querySelector('#next').addEventListener('click', () => {
    const numberOfColumns = Number(document.querySelector('#columns').value);
    if (numberOfColumns !== Math.floor(numberOfColumns) || numberOfColumns < 1 || isNaN(numberOfColumns)) {
        document.querySelector('#columns').classList.add('error');
        return;
    }

    const grid = new Grid(document.querySelector('#link').value, numberOfColumns, () => {
        document.querySelector('.loading').classList.add('hidden');
        document.body.append(grid.element);

        if (
            (window.innerHeight * 0.9) / grid.image.height <
            (window.innerWidth * 0.9) / grid.image.width
        )
            grid.element.style.transform = `scale(${
                (window.innerHeight * 0.9) / grid.image.height
            })`;
        else
            grid.element.style.transform = `scale(${
                (window.innerWidth * 0.9) / grid.image.width
            })`;

        document.onkeydown = (e) => {
            const directions = {
                38: 'top',
                40: 'bottom',
                37: 'left',
                39: 'right',
            };
            grid.moveOnBlank(directions[e.keyCode]);
        };
    });

    document.querySelector('.loading').classList.remove('hidden');
    document.querySelector('#next').remove();
    document.querySelector('#link').remove();
    document.querySelector('#columns').remove();
});
