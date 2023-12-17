import * as fs from 'fs';

function calculateWays(time: number, distance: number): number {
    let ways = 0;
    for (let buttonTime = 0; buttonTime < time; buttonTime++) {
        const travelTime = time - buttonTime;
        const travelDistance = buttonTime * travelTime;
        if (travelDistance > distance) {
            ways++;
        }
    }
    return ways;
}

function parseInput(input: string): { times: number[], distances: number[] } {
    const lines = input.split('\n');
    const times = lines[0].split(/\s+/).filter(Boolean).slice(1).map(Number);
    const distances = lines[1].split(/\s+/).filter(Boolean).slice(1).map(Number);
    return { times, distances };
}

function readInputFile(filePath: string): number[] {
    const content = fs.readFileSync(filePath, 'utf8');
    const { times, distances } = parseInput(content);
    return times.map((time, index) => calculateWays(time, distances[index]));
}

function main() {
    const filePath = 'input.txt'; // Replace with your input file path
    const waysPerRace = readInputFile(filePath);
    const totalWays = waysPerRace.reduce((acc, ways) => acc * ways, 1);
    console.log(`Total ways to beat the record: ${totalWays}`);
}

main();

