import fs from 'fs';

function navigateNetwork(instructions: string, nodes: Map<string, [string, string]>): number {
    let currentNode = 'AAA';
    let steps = 0;

    while (currentNode !== 'ZZZ') {
        const instruction = instructions[steps % instructions.length];
        currentNode = nodes.get(currentNode)![instruction === 'L' ? 0 : 1];
        steps++;
    }

    return steps;
}

function processInputFile(filePath: string): void {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        const lines = data.trim().split('\n');
        const instructions = lines[0].trim();
        const nodes = new Map<string, [string, string]>();

        for (let i = 1; i < lines.length; i++) {
            const [node, left, right] = lines[i].trim().split(/\s*=\s*\(|,\s*|\)\s*/);
            nodes.set(node, [left, right]);
        }

        const steps = navigateNetwork(instructions, nodes);
        console.log(`It takes ${steps} steps to reach ZZZ.`);
    });
}

const filePath = 'input.txt';
processInputFile(filePath);

