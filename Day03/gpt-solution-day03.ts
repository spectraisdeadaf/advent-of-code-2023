import * as fs from 'fs';

function sumPartNumbers(schematic: string): number {
    const grid = schematic.split("\n").map(line => line.trim().split(''));
    const symbolSet = new Set();
    let sum = 0;

    // Precompute the locations of all symbols
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (isNaN(parseInt(grid[row][col])) && grid[row][col] !== '.') {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        let newRow = row + dr, newCol = col + dc;
                        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[row].length) {
                            symbolSet.add(`${newRow},${newCol}`);
                        }
                    }
                }
            }
        }
    }

    // Iterate over the grid to sum part numbers
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (!isNaN(parseInt(grid[row][col]))) {
                let numberStr = '';
                let tempCol = col;
                while (tempCol < grid[row].length && !isNaN(parseInt(grid[row][tempCol]))) {
                    numberStr += grid[row][tempCol];
                    tempCol++;
                }

                if (isAdjacentToSymbol(symbolSet, row, col, tempCol - 1)) {
                    sum += parseInt(numberStr);
                }

                col = tempCol - 1; // Skip the rest of the number
            }
        }
    }

    return sum;
}

function isAdjacentToSymbol(symbolSet, row, startCol, endCol) {
    for (let col = startCol; col <= endCol; col++) {
        if (symbolSet.has(`${row},${col}`)) {
            return true;
        }
    }
    return false;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    console.log(`Total sum of part numbers: ${sumPartNumbers(data)}`);
});
