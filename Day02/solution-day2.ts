import * as fs from 'fs';

// Define a type for storing cube counts for each color
type CubeSet = { red: number, green: number, blue: number };

// Function to check if a game is possible with the given maximum cubes
function isGamePossible(game: CubeSet[]): boolean {
    const maxCubes = { red: 12, green: 13, blue: 14 };

    for (const set of game) {
        // Check if any color exceeds its maximum limit in the bag
        if (set.red > maxCubes.red || set.green > maxCubes.green || set.blue > maxCubes.blue) {
            return false;
        }
    }

    return true;
}

// Function to parse a game data string into a structured format
function parseGame(data: string): CubeSet[] {
    return data.split('; ').map(set => {
        const cubes = { red: 0, green: 0, blue: 0 };
        set.split(', ').forEach(cube => {
            const [count, color] = cube.split(' ');
            cubes[color as keyof CubeSet] = parseInt(count);
        });
        return cubes;
    });
}

// Function to calculate the sum of IDs of games that are possible
function sumOfPossibleGames(gamesData: string[]): number {
    let sum = 0; 
    gamesData.forEach((gameData, index) => {
        const gameID = index + 1; 
        const game = parseGame(gameData); 
        if (isGamePossible(game)) {
            sum += gameID;
        }
    });

    return sum;
}

// Function to process the input file and output the result
function processInputFile(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const gamesData = fileContent.split('\n').filter(line => line.trim() !== '');
    console.log(`Sum of possible game IDs: ${sumOfPossibleGames(gamesData)}`);
}

processInputFile('input.txt');
