import { promises as fs } from 'fs';

type CubeSet = { red: number, green: number, blue: number };

function isSetPossible(set: CubeSet, maxCubes: CubeSet): boolean {
    return set.red <= maxCubes.red && set.green <= maxCubes.green && set.blue <= maxCubes.blue;
}

function isGamePossible(gameData: string, maxCubes: CubeSet): boolean {
    const sets = gameData.split('; ');

    for (let setData of sets) {
        const cubes = { red: 0, green: 0, blue: 0 };
        setData.split(', ').forEach(cube => {
            const [count, color] = cube.split(' ');
            cubes[color as keyof CubeSet] += parseInt(count);
        });

        if (!isSetPossible(cubes, maxCubes)) {
            return false;
        }
    }

    return true;
}

async function processInputFile(filePath: string) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const gamesData = fileContent.split('\n').filter(line => line.trim() !== '');

    let sum = 0;
    const maxCubes = { red: 12, green: 13, blue: 14 };

    gamesData.forEach((gameData, index) => {
        if (isGamePossible(gameData, maxCubes)) {
            sum += index + 1;
        }
    });

    console.log(`Sum of possible game IDs: ${sum}`);
}

processInputFile('input.txt').catch(console.error);

