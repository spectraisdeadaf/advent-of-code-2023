import * as fs from 'fs';

function parseSchematic(schematic: string): string[][] {
    return schematic.split("\n").map(line => line.trim().split(''));
}

function isSymbol(char: string): boolean {
    return isNaN(parseInt(char)) && char !== '.';
}

function isAdjacentToSymbol(grid: string[][], row: number, col: number): boolean {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            if (isSymbol(grid[newRow][newCol])) {
                return true;
            }
        }
    }
    return false;
}

function sumPartNumbers(schematic: string): number {
    const grid = parseSchematic(schematic);
    let sum = 0;
    let checkedPositions = new Set<string>();

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (!isNaN(parseInt(grid[row][col])) && !checkedPositions.has(`${row},${col}`)) {
                let numberStr = '';
                let tempCol = col;

                while (tempCol < grid[row].length && !isNaN(parseInt(grid[row][tempCol]))) {
                    numberStr += grid[row][tempCol];
                    checkedPositions.add(`${row},${tempCol}`);
                    tempCol++;
                }

                if (numberStr.split('').some((_, idx) => isAdjacentToSymbol(grid, row, col + idx))) {
                    sum += parseInt(numberStr);
                }

                col = tempCol - 1;
            }
        }
    }

    return sum;
}

const schematicFile = 'input.txt';

fs.readFile(schematicFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    console.log(`Total sum of part numbers: ${sumPartNumbers(data)}`);
});

