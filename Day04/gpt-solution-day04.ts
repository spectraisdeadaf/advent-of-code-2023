import * as fs from 'fs';

async function calculateCardPoints(winningNumbers: number[], myNumbersSet: Set<number>): Promise<number> {
    const matches = winningNumbers.filter(num => myNumbersSet.has(num));
    return matches.length > 0 ? 2 ** (matches.length - 1) : 0;
}

function processLine(line: string): [number[], Set<number>] {
    const [winningPart, myPart] = line.split('|').map(part =>
        part.trim().split(' ').filter(str => str !== '').map(Number)
    );
    return [winningPart, new Set(myPart)];
}

async function calculateTotalPoints(filePath: string): Promise<number> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data.trim().split('\n').reduce(async (accPromise, line) => {
            const acc = await accPromise;
            const [winningNumbers, myNumbersSet] = processLine(line);
            return acc + await calculateCardPoints(winningNumbers, myNumbersSet);
        }, Promise.resolve(0));
    } catch (err) {
        console.error('Error reading file:', err);
        return 0;
    }
}

async function main() {
    const totalPoints = await calculateTotalPoints('input.txt');
    console.log(`Total Points: ${totalPoints}`);
}

main();

