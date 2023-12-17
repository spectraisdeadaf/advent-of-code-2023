import * as fs from 'fs';

function calculateCardPoints(winningNumbers: number[], myNumbers: number[]): number {
    const matches = winningNumbers.filter(num => myNumbers.includes(num));
    return matches.length > 0 ? 2 ** (matches.length - 1) : 0;
}

function processLine(line: string): [number[], number[]] {
    const parts = line.split('|').map(part => 
        part.trim().split(' ')
             .filter(str => str !== '')
             .map(Number)
    );
    return [parts[0], parts[1]];
}

function calculateTotalPoints(filePath: string): number {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.trim().split('\n');
        let totalPoints = 0;

        for (let line of lines) {
            const [winningNumbers, myNumbers] = processLine(line);
            totalPoints += calculateCardPoints(winningNumbers, myNumbers);
        }

        return totalPoints;
    } catch (err) {
        console.error('Error reading file:', err);
        return 0;
    }
}

const totalPoints = calculateTotalPoints('input.txt');
console.log(`Total Points: ${totalPoints}`);