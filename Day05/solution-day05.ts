import * as fs from 'fs';

type MapEntry = [number, number, number];
type MapType = MapEntry[];

const parseMapEntry = (line: string): MapEntry => {
    const parts = line.split(' ').map(Number);
    return [parts[0], parts[1], parts[2]];
};

const convertNumber = (number: number, conversionMap: MapType): number => {
    for (const [destStart, srcStart, length] of conversionMap) {
        if (number >= srcStart && number < srcStart + length) {
            return destStart + (number - srcStart);
        }
    }
    return number;
};

const processFile = (filePath: string): number => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    const seedsLine = lines.shift();
    const seeds = seedsLine.split(': ')[1].split(' ').map(Number);

    const maps: MapType[] = [];
    let currentMap: MapEntry[] = [];

    for (const line of lines) {
        if (line === '') {
            if (currentMap.length > 0) {
                maps.push(currentMap);
                currentMap = [];
            }
        } else if (!line.includes('map:')) {
            currentMap.push(parseMapEntry(line));
        }
    }
    if (currentMap.length > 0) {
        maps.push(currentMap);
    }

    return seeds.map(seed => maps.reduce((acc, map) => convertNumber(acc, map), seed))
                .reduce((min, loc) => Math.min(min, loc), Number.MAX_VALUE);
};

const lowestLocation = processFile('input.txt');
console.log(lowestLocation);
