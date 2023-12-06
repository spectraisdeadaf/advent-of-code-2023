import { readFileSync } from 'fs';
import { EOL } from 'os';

function isDigit(char: string): boolean {
  return char >= '0' && char <= '9';
}

function processLine(line: string): number{
  let combinedDigit = 0;
  let firstDigit: string | null = null;
  let lastDigit: string | null = null;

  for (const char of line) {
    if (isDigit(char)) {
      firstDigit = char;
      break;
    }
  }

  for (let i = line.length - 1; i >= 0; i--) {
    if (isDigit(line[i])) {
      lastDigit = line[i];
      break;
    }
  }

  if (firstDigit && lastDigit) {
    combinedDigit = parseInt(firstDigit + lastDigit);
  }
  return combinedDigit;
}

function main() {
  const inputData = readFileSync('input.txt', 'utf-8');
  const lines = inputData.split(EOL);

  let total = 0;

  for (const line of lines) {
    total += processLine(line); 
  }

  console.log(`Total sum of calibration values: ${total}`); 
}

main();

