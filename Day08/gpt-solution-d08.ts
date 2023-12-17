import fs from 'fs';

// Pre-process instructions into a direct form (left: 0, right: 1)
function preprocessInstructions(instructions: string): number[] {
    return instructions.split('').map(instr => instr === 'L' ? 0 : 1);
}

// Function to navigate through the network
function navigateNetwork(instructions: number[], nodes: Map<string, [string, string]>): number {
    let current_node = 'AAA';
    let steps = 0;
    const instructionLength = instructions.length;

    while (current_node !== 'ZZZ') {
        current_node = nodes.get(current_node)![instructions[steps % instructionLength]];
        steps++;
    }

    return steps;
}

// Function to read and process the input file
function processInputFile(filePath: string): void {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        const lines = data.trim().split('\n');
        const preprocessedInstructions = preprocessInstructions(lines[0].trim());
        const nodes = new Map<string, [string, string]>();

        for (let i = 1; i < lines.length; i++) {
            const [node, left, right] = lines[i].trim().split(/\s*=\s*\(|,\s*|\)\s*/);
            nodes.set(node, [left, right]);
        }

        const steps = navigateNetwork(preprocessedInstructions, nodes);
        console.log(`It takes ${steps} steps to reach ZZZ.`);
    });
}

// Example usage
const filePath = 'input.txt'; // Update with the actual path to your input file
processInputFile(filePath);

